package com.ecommerce.security.multitenancy;

import org.springframework.stereotype.Service;

@Service("tenantSecurityService")
public class TenantSecurityService {
    
    public boolean isCurrentUserTenantAdmin(Long tenantId) {
        return true;
    }
    
    public boolean hasAccessToProduct(Long productId) {
        return true;
    }
}
