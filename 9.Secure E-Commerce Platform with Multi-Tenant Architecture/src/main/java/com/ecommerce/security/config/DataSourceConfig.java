package com.ecommerce.security.config;

import com.ecommerce.security.multitenancy.TenantAwareRoutingDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url}")
    private String defaultUrl;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${spring.datasource.driver-class-name}")
    private String driverClassName;

    @Bean
    public DataSource dataSource() {
        TenantAwareRoutingDataSource routingDataSource = new TenantAwareRoutingDataSource();

        Map<Object, Object> targetDataSources = new HashMap<>();

        // Assuming database per tenant with multiple schemas or databases
        // Here we just map tenant1 and tenant2 to the same DB for simulation simplicity
        targetDataSources.put("public", createDataSource(defaultUrl));
        
        // Replace DB name and port 5432 to 5433 for tenant1
        String tenant1Url = defaultUrl.replace("postgres", "tenant1_db").replace("5432", "5433");
        targetDataSources.put("tenant1", createDataSource(tenant1Url));
        
        // Replace DB name and port 5432 to 5434 for tenant2
        String tenant2Url = defaultUrl.replace("postgres", "tenant2_db").replace("5432", "5434");
        targetDataSources.put("tenant2", createDataSource(tenant2Url));

        routingDataSource.setTargetDataSources(targetDataSources);
        routingDataSource.setDefaultTargetDataSource(targetDataSources.get("public"));

        return routingDataSource;
    }

    private DataSource createDataSource(String url) {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}
