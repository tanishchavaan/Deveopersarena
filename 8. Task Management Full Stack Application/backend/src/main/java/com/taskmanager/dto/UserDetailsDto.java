package com.taskmanager.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDetailsDto {
    private Long id;
    private String email;
    private String name;
}
