package com.blogapi.service;

import com.blogapi.model.entity.Comment;

public interface CommentService {
    Comment create(Long postId, Comment comment);
}