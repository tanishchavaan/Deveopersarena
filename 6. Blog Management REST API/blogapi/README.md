# Blog Management REST API

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Objectives](#objectives)  
3. [Technology Stack](#technology-stack)  
4. [Project Structure](#project-structure)  
5. [Entity Relationship](#entity-relationship)  
6. [API Endpoints](#api-endpoints)  
7. [Sample Requests & Responses](#sample-requests-responses)  
8. [Setup and Installation](#setup-and-installation)  
9. [Testing](#testing)  
10. [Swagger/OpenAPI Documentation](#swagger-openapi-documentation)  
11. [Technical Implementation Details](#technical-implementation-details)  
12. [Screenshots](#screenshots)  
13. [Future Enhancements](#future-enhancements)  

---

## Project Overview
**Blog Management REST API** is a comprehensive backend application built with **Spring Boot 3.x**.  
It provides a **RESTful interface** for managing:  

- **Posts** (create, read, update, delete)  
- **Categories** (categorize posts)  
- **Comments** (user interactions on posts)  

Key design goals:  
- Layered architecture (**Controller → Service → Repository**)  
- **JPA/Hibernate** for entity persistence  
- Proper **request validation** and **exception handling**  
- **Pagination & sorting** support  
- **Swagger/OpenAPI** documentation  
- H2 database for development and PostgreSQL for production  

---

## Objectives
- Provide a professional, clean REST API for blog management  
- Demonstrate relational data modeling using JPA  
- Ensure standardized JSON responses with `ApiResponse` wrapper  
- Make the API testable with **Postman** or **Swagger UI**  
- Deployable backend for integration with frontend apps  

---

## Technology Stack

| Layer       | Technology |
|------------|------------|
| Backend    | Java 17+, Spring Boot 3.x, Spring Web, Spring Data JPA, Hibernate |
| Database   | H2 (Development), PostgreSQL (Production) |
| API Docs   | Springdoc OpenAPI, Swagger UI |
| Build Tool | Maven |
| Testing    | JUnit 5, Mockito |
| Version Control | Git, GitHub |

---

## Project Structure

```text
week6-spring-blog-api/
│── src/main/java/com/blogapi/
│   ├── BlogApiApplication.java        # Main Spring Boot application
│   ├── config/                        # App configurations (Swagger, DB, etc.)
│   ├── controller/                    # REST controllers for posts, categories, comments
│   ├── service/                       # Service interfaces & implementations
│   ├── repository/                    # JPA Repositories
│   ├── model/
│   │   ├── entity/                    # JPA Entities (Post, Category, Comment)
│   │   └── dto/                       # Data Transfer Objects
│   └── exception/                     # Custom exception handling & ApiResponse
│── src/main/resources/
│   └── application.properties         # Configuration (port, DB, etc.)
│── pom.xml                             # Maven build file
│── README.md                           # Documentation
