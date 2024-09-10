package org.example.final1.config.websocket;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import org.springframework.stereotype.Component;

@Component
public class ScreenShareWebSocketHandler extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<>());

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("WebSocket session connected: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("WebSocket session disconnected: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        System.out.println("ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ: " + message.getPayload());
        // 브로드캐스트
        for (WebSocketSession s : sessions) {
            try {
                if (s.isOpen()) {
                    // 받은 메시지를 모든 세션에 전송
                    System.out.println("Sending message to session: " + s.getId());
                    s.sendMessage(new TextMessage(message.getPayload())); 
                } else {
                    System.out.println("Session " + s.getId() + " is closed.");
                }
            } catch (Exception e) {
                System.err.println("Error sending message to session: " + s.getId() + " - " + e.getMessage());
            }
        }
    }

    public Set<WebSocketSession> getSessions() {
        return sessions;
    }
}
