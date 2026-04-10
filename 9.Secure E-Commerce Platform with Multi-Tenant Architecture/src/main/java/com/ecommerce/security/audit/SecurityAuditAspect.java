package com.ecommerce.security.audit;

import com.ecommerce.security.multitenancy.TenantContext;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;

@Aspect
@Component
@Slf4j
public class SecurityAuditAspect {

    @AfterReturning("execution(* com.ecommerce.controller.AuthController.login(..))")
    public void auditLoginSuccess(JoinPoint joinPoint) {
        logEvent("AUTH_SUCCESS", "Login successful");
    }
    
    @AfterReturning("execution(* com.ecommerce.controller.AuthController.logout(..))")
    public void auditLogout(JoinPoint joinPoint) {
        logEvent("LOGOUT", "User logged out");
    }

    private void logEvent(String eventType, String details) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = (auth != null) ? auth.getName() : "anonymous";
        String tenantId = TenantContext.getCurrentTenant();
        
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        String ipAddress = "unknown";
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            ipAddress = request.getRemoteAddr();
        }

        SecurityEvent event = SecurityEvent.builder()
                .eventType(eventType)
                .username(username)
                .tenantId(tenantId != null ? tenantId : "public")
                .ipAddress(ipAddress)
                .timestamp(LocalDateTime.now())
                .details(details)
                .build();
                
        log.info("SECURITY AUDIT | {} | {} | {} | {} | {}", 
                event.getEventType(), event.getUsername(), event.getTenantId(), 
                event.getIpAddress(), event.getDetails());
    }
}
