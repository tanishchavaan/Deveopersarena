package com.ecommerce.service;

import com.ecommerce.model.entity.Product;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    
    @PreAuthorize("hasRole('ADMIN') or (hasRole('VENDOR') and @tenantSecurityService.isCurrentUserTenantAdmin(#tenantId))")
    @Transactional
    public Product createProduct(Product product, Long tenantId) {
        return productRepository.save(product);
    }
    
    @PreAuthorize("hasRole('ADMIN') or @tenantSecurityService.hasAccessToProduct(#productId)")
    @Transactional(readOnly = true)
    public Product getProduct(Long productId) {
        return productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));
    }
    
    @PreAuthorize("hasRole('ADMIN') or @tenantSecurityService.isCurrentUserTenantAdmin(#tenantId)")
    @Transactional
    public Product updateProduct(Long productId, Product updates, Long tenantId) {
        Product product = getProduct(productId);
        return productRepository.save(product);
    }
    
    @PreAuthorize("hasRole('ADMIN') or @tenantSecurityService.isCurrentUserTenantAdmin(#tenantId)")
    @Transactional
    public void deleteProduct(Long productId, Long tenantId) {
        Product product = getProduct(productId);
        productRepository.delete(product);
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'VENDOR', 'CUSTOMER')")
    @Transactional(readOnly = true)
    public List<Product> getProductsByTenant(Long tenantId) {
        return productRepository.findByTenantId(tenantId);
    }
}
