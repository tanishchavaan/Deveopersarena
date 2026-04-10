package com.ecommerce.controller;

import com.ecommerce.model.dto.JwtResponse;
import com.ecommerce.model.dto.LoginRequest;
import com.ecommerce.model.dto.PasswordResetRequest;
import com.ecommerce.model.dto.RefreshRequest;
import com.ecommerce.model.dto.UserProfile;
import com.ecommerce.security.LoginAttemptService;
import com.ecommerce.security.jwt.JwtTokenProvider;
import com.ecommerce.security.jwt.TokenBlacklistService;
import com.ecommerce.security.multitenancy.TenantContext;
import com.ecommerce.security.validation.ValidPassword;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final TokenBlacklistService tokenBlacklistService;
    private final LoginAttemptService loginAttemptService;

    @PostMapping("/login")
    @RateLimiter(name = "loginRateLimit")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        String clientIp = getClientIP(request);
        
        if (loginAttemptService.isBlocked(clientIp)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .body("Account locked out due to too many failed attempts. Try again later.");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            // Successfully authenticated
            loginAttemptService.loginSucceeded(clientIp);

            String tenantId = TenantContext.getCurrentTenant();
            if (tenantId == null) tenantId = "public";

            String accessToken = tokenProvider.createAccessToken(authentication, tenantId);
            String refreshToken = tokenProvider.createRefreshToken(authentication, tenantId);

            Set<String> roles = authentication.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toSet());

            UserProfile userProfile = UserProfile.builder()
                    .email(authentication.getName())
                    .tenantId(tenantId)
                    .roles(roles)
                    .build();

            JwtResponse response = JwtResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .tokenType("Bearer")
                    .expiresIn(900L) // 15 mins
                    .user(userProfile)
                    .build();

            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            loginAttemptService.loginFailed(clientIp);
            throw e; // Handled by @ExceptionHandler
        }
    }

    @PostMapping("/refresh")
    @RateLimiter(name = "apiRateLimit")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshRequest refreshRequest) {
        String refreshToken = refreshRequest.getRefreshToken();
        
        if (tokenBlacklistService.isBlacklisted(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token has been revoked.");
        }
        
        if (tokenProvider.validateToken(refreshToken)) {
            Authentication authentication = tokenProvider.getAuthentication(refreshToken);
            String tenantId = tokenProvider.getTenantId(refreshToken);
            
            String newAccessToken = tokenProvider.createAccessToken(authentication, tenantId);
            String newRefreshToken = tokenProvider.createRefreshToken(authentication, tenantId);
            
            // Blacklist the old refresh token (Token Rotation)
            long expiration = tokenProvider.getExpirationDate(refreshToken).getTime() - System.currentTimeMillis();
            tokenBlacklistService.blacklistToken(refreshToken, expiration);
            
            JwtResponse response = JwtResponse.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(newRefreshToken)
                    .tokenType("Bearer")
                    .expiresIn(900L)
                    .build();
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token.");
    }

    @PostMapping("/password-reset")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody PasswordResetRequest request) {
        // Dummy implementation. In real scenarios: validate token from email link, then updated pass in DB
        return ResponseEntity.ok("Password reset successfully for email: " + request.getEmail());
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: " + e.getMessage());
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
            long expiration = tokenProvider.getExpirationDate(token).getTime() - System.currentTimeMillis();
            tokenBlacklistService.blacklistToken(token, expiration);
        }
        return ResponseEntity.ok("Logged out successfully");
    }
    
    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}
