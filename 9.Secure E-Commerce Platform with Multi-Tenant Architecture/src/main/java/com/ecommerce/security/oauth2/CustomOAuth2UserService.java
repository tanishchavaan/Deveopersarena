package com.ecommerce.security.oauth2;

import com.ecommerce.model.entity.Role;
import com.ecommerce.model.entity.User;
import com.ecommerce.model.enums.UserStatus;
import com.ecommerce.repository.RoleRepository;
import com.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);
        
        String email = oauth2User.getAttribute("email");
        // GitHub might use "login" if email is private, skipping complex mapping for brevity
        if (email == null) {
            email = oauth2User.getAttribute("login") + "@github.local";
        }
        
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            User newUser = User.builder()
                .email(email)
                .firstName(oauth2User.getAttribute("given_name"))
                .lastName(oauth2User.getAttribute("family_name"))
                .password(UUID.randomUUID().toString()) // Dummy random password
                .status(UserStatus.ACTIVE)
                .tenantId("public")
                .build();
                
            Optional<Role> customerRole = roleRepository.findByName("CUSTOMER");
            customerRole.ifPresent(newUser::addRole);
            
            userRepository.save(newUser);
        }
        
        return oauth2User;
    }
}
