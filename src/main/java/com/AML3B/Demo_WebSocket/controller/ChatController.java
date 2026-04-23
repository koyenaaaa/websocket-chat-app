package com.AML3B.Demo_WebSocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.AML3B.Demo_WebSocket.model.Message;

@Controller
public class ChatController {

    @MessageMapping("/chat")          // client sends here
    @SendTo("/topic/messages")        // broadcast to all
    public Message sendMessage(Message message) {
    	System.out.println(message.getSender()+" : "+ message.getContent());
        return message;
    }
}