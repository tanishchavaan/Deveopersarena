package com.ecommerce;

import com.ecommerce.model.entity.Role;
import com.ecommerce.model.entity.User;
import com.ecommerce.model.enums.UserStatus;
import com.ecommerce.repository.RoleRepository;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.security.multitenancy.TenantContext;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Switch to tenant1 database map for seeding
        TenantContext.setCurrentTenant("tenant1");

        // Seed Role
        Role customerRole;
        if (roleRepository.findByName("CUSTOMER").isEmpty()) {
            customerRole = Role.builder().name("CUSTOMER").build();
            roleRepository.save(customerRole);
        } else {
            customerRole = roleRepository.findByName("CUSTOMER").get();
        }

        // Seed User
        if (userRepository.findByEmail("test@example.com").isEmpty()) {
            User testUser = User.builder()
                    .email("test@example.com")
                    // Our regex requires: 1 upper, 1 lower, 1 digit, 1 special, 8 chars minimum
                    .password(passwordEncoder.encode("Password123!")) 
                    .firstName("Test")
                    .lastName("User")
                    .status(UserStatus.ACTIVE)
                    .tenantId("tenant1")
                    .build();
            testUser.addRole(customerRole);
            userRepository.save(testUser);
            System.out.println("✅ SUCCESSFULLY SEEDED TEST USER IN TENANT1 DATABASE: test@example.com / Password123!");
        }

        TenantContext.clear(); // Important to clear the threadlocal after setup!
    }
}
