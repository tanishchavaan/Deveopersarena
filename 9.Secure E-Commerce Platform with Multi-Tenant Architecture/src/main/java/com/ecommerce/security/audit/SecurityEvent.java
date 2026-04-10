package com.ecommerce.security.audit;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class SecurityEvent {
    private String eventType;
    private String username;
    private String tenantId;
    private String ipAddress;
    private LocalDateTime timestamp;
    private String details;
}
