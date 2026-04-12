# 🛒 E-commerce Backend with Database Integration

## 📌 Project Overview
A comprehensive **e-commerce backend system** built using **Spring Boot, Spring Data JPA, and PostgreSQL**. This project demonstrates real-world backend development including database design, transaction management, API development, and performance optimization.

---

## 🚀 Features

- Complete e-commerce database schema with relationships  
- Product catalog with categories and inventory  
- Order processing with transaction management  
- User authentication & profile management  
- Payment processing system  
- Database migrations using Flyway  
- Query optimization with indexes  
- Caching support  
- Connection pooling with HikariCP  
- RESTful APIs  

---

## 🛠️ Tech Stack

- Java 17  
- Spring Boot 3.x  
- Spring Data JPA  
- PostgreSQL  
- Flyway  
- HikariCP  
- Docker  
- Lombok  
- MapStruct  

---

## 🗄️ Database Schema

### Tables
- users  
- products  
- categories  
- orders  
- order_items  
- payments  

### Relationships
- One User → Many Orders  
- One Order → Many OrderItems  
- One Product → One Category  
- One Category → Many Products  
- One Order → One Payment  

---

