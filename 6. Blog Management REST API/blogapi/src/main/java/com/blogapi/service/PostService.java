package com.blogapi.service;

import java.util.List;

import com.blogapi.model.dto.PostRequest;
import com.blogapi.model.dto.PostResponse;

public interface PostService {
    PostResponse createPost(PostRequest request);
    List<PostResponse> getAllPosts();
    PostResponse getPostById(Long id);
    void deletePost(Long id);
}