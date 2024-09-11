package org.example.final1.config.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocket
public class WebsocketConfig implements WebMvcConfigurer, WebSocketConfigurer {

	@Bean
    public ChatWebSocketHandler chatWebSocketHandler() {
        return new ChatWebSocketHandler();
    }

	@Bean
	public ScreenShareWebSocketHandler screenShareWebSocketHandler() {
		return new ScreenShareWebSocketHandler();
	}
	
    @Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // 모든 엔드포인트에서 CORS 설정
				//.allowedOrigins("http://localhost:3000")
				.allowedOrigins("https://www.quizverse.kro.kr") //react 주소
				.allowedMethods("GET","POST","PUT","DELETE","OPTIONS")// 허용할 HTTP 메서드
				.allowedHeaders("*") //적용할 헤더
				.allowCredentials(true);
	}
	
	 @Override
	 public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		 registry.addHandler(new ChatWebSocketHandler(), "/ws/chat")
	             //.setAllowedOrigins("http://localhost:3000") // React 앱 주소
	             .setAllowedOrigins("https://www.quizverse.kro.kr")
	             .addInterceptors(new HttpSessionHandshakeInterceptor());

		// 화면 공유 WebSocket 핸들러 등록
		registry.addHandler(screenShareWebSocketHandler(), "/ws/screen-share")
				//.setAllowedOrigins("http://localhost:3000") // React 앱 주소
				.setAllowedOrigins("https://www.quizverse.kro.kr")
				.addInterceptors(new HttpSessionHandshakeInterceptor());
	 }	
}
