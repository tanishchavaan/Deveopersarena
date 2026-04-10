package com.ecommerce.service;

import com.ecommerce.model.entity.Tenant;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TenantService {
    public List<Tenant> getAllTenants() {
        return new ArrayList<>();
    }
}
