package com.blogapi.service;

import java.util.List;

import com.blogapi.model.entity.Category;

public interface CategoryService {
    Category create(Category category);
    List<Category> getAll();
}