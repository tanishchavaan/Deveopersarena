package com.taskmanager.dto;

import com.taskmanager.model.enums.TaskStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateTaskStatusRequest {
    @NotNull
    private TaskStatus status;
}
