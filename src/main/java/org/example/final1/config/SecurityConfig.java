package org.example.final1.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    //비밀번호암호화    
    @Bean
    public BCryptPasswordEncoder encodePwd(){
        return new BCryptPasswordEncoder();
    }

    //시큐리티필터체인-> 로그인시 가는 경로 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/mypage/**").authenticated()
                        .anyRequest().permitAll() // 나머지 URL은 전부 권한을 허용해줌
                )
                .formLogin(form -> form
                        .loginPage("/account/login") // 로그인 페이지 설정
                        .usernameParameter("user_email")//username변수 user_email로 바꿔주기
                        .loginProcessingUrl("/account/login") // 로그인 처리 경로 // /login 주소가 호출이 되면 시큐리티가 낚아채서 대신 로그인을 진행해준다.
                        .defaultSuccessUrl("/") // 로그인 성공 후 이동할 기본 페이지
                );




        return http.build(); // HttpSecurity 객체를 반환하여 필터 체인 구성을 완료
    }
}
