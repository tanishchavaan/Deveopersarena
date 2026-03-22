package com.blogapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blogapi.model.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}