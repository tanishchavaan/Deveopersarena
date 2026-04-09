package com.taskmanager.service;

import com.taskmanager.dto.TaskDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class WebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public void broadcastTaskUpdate(TaskDto task, String action) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("type", action);
        payload.put("payload", task);
        payload.put("timestamp", LocalDateTime.now());

        messagingTemplate.convertAndSend("/topic/tasks", payload);
    }
}
