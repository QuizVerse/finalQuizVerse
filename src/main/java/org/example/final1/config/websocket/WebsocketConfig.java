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

	@Bean
    public CameraWebSocketHandler cameraWebSocketHandler() {
        return new CameraWebSocketHandler();
    }
	
	 @Override
	 public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		 registry.addHandler(new ChatWebSocketHandler(), "/ws/chat")
	             //.setAllowedOrigins("http://localhost:3000")
				 .setAllowedOrigins("http://www.quizverse.kro.kr")
	             .addInterceptors(new HttpSessionHandshakeInterceptor());

		// 화면 공유 WebSocket 핸들러 등록
		registry.addHandler(screenShareWebSocketHandler(), "/ws/screen-share")
				//.setAllowedOrigins("http://localhost:3000") // React 앱 주소
				.setAllowedOrigins("http://www.quizverse.kro.kr")
				.addInterceptors(new HttpSessionHandshakeInterceptor());
		//카메라 
		registry.addHandler(cameraWebSocketHandler(), "/ws/camera")
			//.setAllowedOrigins("http://localhost:3000")
			.setAllowedOrigins("http://www.quizverse.kro.kr")
			.addInterceptors(new HttpSessionHandshakeInterceptor());

	}	

	  // HTTP 요청에 대한 CORS 설정 추가
	  @Override
	  public void addCorsMappings(CorsRegistry registry) {
		  registry.addMapping("/ws/**")
			  //.allowedOrigins("http://localhost:3000")
			  .allowedOrigins("http://www.quizverse.kro.kr")
			  .allowedMethods("*");
	  }
}
