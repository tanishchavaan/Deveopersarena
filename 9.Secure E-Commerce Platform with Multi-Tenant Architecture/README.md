
# 🔐 Secure E-Commerce Platform with Multi-Tenant Architecture

## 📌 Project Overview

### 🔍 Introduction
This project is a **secure, enterprise-grade e-commerce platform** built using **Spring Boot and Spring Security**. It supports **multi-tenant architecture**, allowing multiple businesses to operate independently on the same application while maintaining strict data isolation.

### 🎯 Objectives
- Implement secure authentication using JWT and OAuth2  
- Build role-based and permission-based authorization  
- Design scalable multi-tenant architecture  
- Apply OWASP-level security practices  
- Enable auditing and monitoring of security events  

---

## 🧠 Key Features

### 🔑 Authentication
- JWT-based authentication (Access + Refresh Tokens)
- Refresh token rotation and blacklisting
- OAuth2 login (Google, GitHub)
- Password reset with email verification
- Account lockout after failed attempts
- Optional Two-Factor Authentication (2FA)

### 👥 Authorization
- Role-Based Access Control (ADMIN, VENDOR, CUSTOMER)
- Method-level security (`@PreAuthorize`)
- Permission-based access control
- Tenant-based authorization
- Custom security expressions

### 🏢 Multi-Tenancy
- Database-level tenant isolation
- Tenant identification via JWT
- Dynamic database routing
- Shared database for global data
- Tenant onboarding system

### 🚨 Security Measures
- API rate limiting (Resilience4j)
- Input validation and sanitization
- SQL injection prevention
- XSS protection (CSP headers)
- CSRF protection
- Security headers (HSTS, X-Frame-Options)
- Request/response logging with masking
- Security audit logs

---

## 🏗️ Architecture

### 🏢 Multi-Tenant Architecture
