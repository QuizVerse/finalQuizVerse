package org.example.final1.controller.chatbot;

import org.example.final1.service.ChatbotService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@Controller
public class ChatbotController {

    private final ChatbotService chatbotService;

    // 생성자를 통해 ChatbotService 주입
    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    public String sendMessage(@Payload String chatMessage) {
        try {
            // ChatbotService를 통해 네이버 클로바 챗봇에 메시지 전달 및 응답 받기
            return chatbotService.processChatMessage(chatMessage);
        } catch (IOException e) {
            e.printStackTrace();
            return "Error processing chatbot message: " + e.getMessage();
        }
    }
}
