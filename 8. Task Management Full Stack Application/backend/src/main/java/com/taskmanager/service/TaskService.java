package com.taskmanager.service;

import com.taskmanager.dto.CreateTaskRequest;
import com.taskmanager.dto.TaskDto;
import com.taskmanager.dto.UpdateTaskRequest;
import com.taskmanager.dto.UserDetailsDto;
import com.taskmanager.model.entity.Task;
import com.taskmanager.model.entity.User;
import com.taskmanager.model.enums.TaskPriority;
import com.taskmanager.model.enums.TaskStatus;
import com.taskmanager.repository.TaskRepository;
import com.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TaskService {
    
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final WebSocketService webSocketService;

    public Page<TaskDto> getTasks(String status, String priority, Long assigneeId, Pageable pageable, User currentUser) {
        Specification<Task> spec = Specification.where(null);

        if (status != null && !status.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), TaskStatus.valueOf(status)));
        }
        if (priority != null && !priority.isEmpty()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("priority"), TaskPriority.valueOf(priority)));
        }
        if (assigneeId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("assignee").get("id"), assigneeId));
        }

        return taskRepository.findAll(spec, pageable).map(this::mapToDto);
    }

    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        return mapToDto(task);
    }

    @Transactional
    public TaskDto createTask(CreateTaskRequest request, User currentUser) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus() != null ? request.getStatus() : TaskStatus.TODO);
        task.setPriority(request.getPriority() != null ? request.getPriority() : TaskPriority.MEDIUM);
        task.setDueDate(request.getDueDate());
        task.setCreatedBy(currentUser);

        if (request.getAssigneeId() != null) {
            User assignee = userRepository.findById(request.getAssigneeId()).orElseThrow(() -> new RuntimeException("Assignee not found"));
            task.setAssignee(assignee);
        }

        Task savedTask = taskRepository.save(task);
        TaskDto dto = mapToDto(savedTask);
        webSocketService.broadcastTaskUpdate(dto, "TASK_CREATED");
        return dto;
    }

    @Transactional
    public TaskDto updateTask(Long id, UpdateTaskRequest request, User currentUser) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));

        if (request.getTitle() != null) task.setTitle(request.getTitle());
        if (request.getDescription() != null) task.setDescription(request.getDescription());
        if (request.getStatus() != null) task.setStatus(request.getStatus());
        if (request.getPriority() != null) task.setPriority(request.getPriority());
        if (request.getDueDate() != null) task.setDueDate(request.getDueDate());
        
        if (request.getAssigneeId() != null) {
            User assignee = userRepository.findById(request.getAssigneeId()).orElseThrow(() -> new RuntimeException("Assignee not found"));
            task.setAssignee(assignee);
        }

        Task savedTask = taskRepository.save(task);
        TaskDto dto = mapToDto(savedTask);
        webSocketService.broadcastTaskUpdate(dto, "TASK_UPDATED");
        return dto;
    }

    @Transactional
    public TaskDto updateTaskStatus(Long id, TaskStatus status, User currentUser) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(status);
        Task savedTask = taskRepository.save(task);
        TaskDto dto = mapToDto(savedTask);
        webSocketService.broadcastTaskUpdate(dto, "TASK_UPDATED");
        return dto;
    }

    @Transactional
    public void deleteTask(Long id, User currentUser) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found");
        }
        taskRepository.deleteById(id);
        
        TaskDto dummyDto = TaskDto.builder().id(id).build();
        webSocketService.broadcastTaskUpdate(dummyDto, "TASK_DELETED");
    }

    private TaskDto mapToDto(Task task) {
        return TaskDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .assignee(task.getAssignee() != null ? UserDetailsDto.builder()
                        .id(task.getAssignee().getId())
                        .name(task.getAssignee().getName())
                        .email(task.getAssignee().getEmail())
                        .build() : null)
                .createdBy(UserDetailsDto.builder()
                        .id(task.getCreatedBy().getId())
                        .name(task.getCreatedBy().getName())
                        .email(task.getCreatedBy().getEmail())
                        .build())
                .build();
    }
}
