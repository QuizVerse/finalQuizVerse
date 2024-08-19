package org.example.final1.config;

import org.example.final1.config.oauth.PrincipalOauth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;


    // 비밀번호 암호화
   /* @Bean
    public BCryptPasswordEncoder encodePwd() {
        return new BCryptPasswordEncoder();
    }*/

    // 시큐리티 필터 체인 -> 로그인 시 가는 경로 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/mypage/**").authenticated()
                        .anyRequest().permitAll() // 나머지 URL은 전부 권한을 허용해줌
                )
                .formLogin(form -> form
                        .loginPage("/account/login") // 로그인 페이지 설정
                        .usernameParameter("user_email") // username 변수를 user_email로 변경
                        .passwordParameter("user_password")
                        .loginProcessingUrl("/login/user/check") // 로그인 처리 경로
                        .defaultSuccessUrl("/") // 로그인 성공 후 이동할 기본 페이지
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/account/login") // OAuth2 로그인 페이지 설정
                        .defaultSuccessUrl("http://localhost:3000") // 로그인 성공 후 이동할 기본 페이지
                        //구글 로그인이 완료된 뒤의 후처리가 필요하다.
                        //1.코드를 받기-> 정상적으로 구글에 로그인했다는 인증
                        //2. 액세스토큰을 받아 시큐리티 서버가 구글 사용자 정보에 접근할수 있는 권한이 생김
                        //3. 사용자 프로필 정보를 갖고와서
                        //4. 그 정보를 토대로 회원가입을 자동으로 진행시켜줌
                        //tip.액세스토큰+사용자프로필 정보를 받기 위해 userinfoendpoint()
                        //userservice()->oauth2userservice객체 사용
                        .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint
                                .userService(principalOauth2UserService) // 설정된 OAuth2 사용자 서비스
                        )

                );
        return http.build(); // HttpSecurity 객체를 반환하여 필터 체인 구성을 완료
    }
}
