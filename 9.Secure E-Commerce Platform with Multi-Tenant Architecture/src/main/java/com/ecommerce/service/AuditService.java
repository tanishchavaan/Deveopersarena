package com.ecommerce.service;

import com.ecommerce.security.audit.SecurityEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuditService {
    
    public void logSecurityEvent(SecurityEvent event) {
        log.info("Persisting Audit Event to storage: {}", event);
    }
}
