package com.taskmanager.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/tasks.status")
    @SendTo("/topic/tasks")
    public Object handleTaskStatusUpdate(@Payload Object payload) {
        return payload;
    }
}
