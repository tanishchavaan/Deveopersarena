package com.ecommerce.controller;

import com.ecommerce.model.entity.User;
import com.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // Placeholders for auth, as detailed in the requirement endpoints set
    @PostMapping("/auth/register")
    public ResponseEntity<String> register() {
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/auth/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok("Mock JWT Token");
    }

    @GetMapping("/users/profile")
    public ResponseEntity<User> getProfile(@RequestParam Long userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @PutMapping("/users/profile")
    public ResponseEntity<String> updateProfile() {
        return ResponseEntity.ok("Profile updated");
    }
}
