package com.ecommerce.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class PasswordResetRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String newPassword;
    
    @NotBlank
    private String token;
}
