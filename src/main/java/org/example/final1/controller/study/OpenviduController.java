package org.example.final1.controller.study;

import java.util.Map;
import java.util.Set;

import org.example.final1.config.websocket.ScreenShareWebSocketHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;

import io.livekit.server.AccessToken;
import io.livekit.server.RoomJoin;
import io.livekit.server.RoomName;
import io.livekit.server.WebhookReceiver;
import livekit.LivekitWebhook.WebhookEvent;

//@CrossOrigin(origins = "http://localhost:3000") 
@CrossOrigin(origins = "https://www.quizverse.kro.kr") 
@RestController
public class OpenviduController {

    @Value("${livekit.api.key}")
	private String LIVEKIT_API_KEY;

	@Value("${livekit.api.secret}")
	private String LIVEKIT_API_SECRET;

	private final ScreenShareWebSocketHandler webSocketHandler;

    // 생성자 주입을 통해 ScreenShareWebSocketHandler 주입
    public OpenviduController(ScreenShareWebSocketHandler webSocketHandler) {
        this.webSocketHandler = webSocketHandler;
    }

	/**
	 * @param params JSON object with roomName and participantName
	 * @return JSON object with the JWT token
	 */
	@PostMapping(value = "/token")
	public ResponseEntity<Map<String, String>> createToken(@RequestBody Map<String, String> params) {
		String roomName = params.get("roomName");
		String participantName = params.get("participantName");

		if (roomName == null || participantName == null) {
			return ResponseEntity.badRequest().body(Map.of("errorMessage", "roomName and participantName are required"));
		}

		AccessToken token = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
		token.setName(participantName);
		token.setIdentity(participantName);
		token.addGrants(new RoomJoin(true), new RoomName(roomName));

		return ResponseEntity.ok(Map.of("token", token.toJwt()));
	}

	@PostMapping(value = "/livekit/webhook", consumes = "application/webhook+json")
	public ResponseEntity<String> receiveWebhook(@RequestHeader("Authorization") String authHeader, @RequestBody String body) {
		WebhookReceiver webhookReceiver = new WebhookReceiver(LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
		try {
			WebhookEvent event = webhookReceiver.receive(body, authHeader);
			System.out.println("LiveKit Webhook: " + event.toString());
		} catch (Exception e) {
			System.err.println("Error validating webhook event: " + e.getMessage());
		}
		return ResponseEntity.ok("ok");
	}

	@PostMapping("/screen-share")
    public ResponseEntity<Map<String, String>> updateScreenShare(@RequestBody Map<String, Object> params) {
        String roomName = (String) params.get("roomName");
        String participantName = (String) params.get("participantName");
        Boolean isSharing = (Boolean) params.get("isSharing");

        // 유효성 검사
        if (roomName == null || participantName == null || isSharing == null) {
            return ResponseEntity.badRequest().body(Map.of("errorMessage", "Invalid parameters"));
        }

        // 화면 공유 상태 로그
        System.out.println("Room: " + roomName + ", Participant: " + participantName + ", isSharing: " + isSharing);

        // 클라이언트에게 화면 공유 상태 브로드캐스트
        String message = "{\"roomName\":\"" + roomName + "\", \"participantName\":\"" + participantName + "\", \"isSharing\":" + isSharing + "}";
        try {
            Set<WebSocketSession> sessions = webSocketHandler.getSessions();
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    session.sendMessage(new TextMessage(message));
                }
            }
        } catch (Exception e) {
            System.err.println("Error sending WebSocket message: " + e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of("errorMessage", "Failed to send screen share status"));
        }

        // 성공 응답 반환
        return ResponseEntity.ok(Map.of("success", "true"));
    }
}
