package org.example.final1.controller.account;

import jakarta.servlet.http.HttpServletRequest;
import org.example.final1.config.auth.PrincipalDetails;
import org.example.final1.config.oauth.LogoutService;
import org.example.final1.jwt.JwtTokenProvider;
import org.example.final1.model.UserDto;
import org.example.final1.service.JwtService;
import org.example.final1.service.TokenService;
import org.example.final1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private TokenService tokenService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private LogoutService logoutService;
    @Autowired
    private JwtService jwtService;



    @GetMapping("/test/login")
    public @ResponseBody String testLogin(Authentication authentication,
                                          @AuthenticationPrincipal PrincipalDetails userDetails) {
        //di(의존성주입)

        /*
         * Authentication 객체는 Spring Security에서 제공하는 기본 인터페이스로, 현재 인증된 사용자에 대한 정보를 담고
         * 있습니다. Authentication 객체를 사용하면 사용자 정보, 인증 상태, 권한 등을 직접적으로 얻을 수 있습니다.
         */
        /*
         * @AuthenticationPrincipal 어노테이션은 메서드 파라미터에 사용되어, 현재 인증된 사용자의 Principal 객체를 직접
         * 주입받을 수 있게 합니다. 이를 통해 메서드의 인자로 직접적으로 사용자 정보를 받을 수 있습니다
         */
        System.out.println("/test/login ===============");
        /* System.out.println("authentication:"+authentication.getPrincipal()); */
        PrincipalDetails principalDetails=(PrincipalDetails)authentication.getPrincipal();
        System.out.println("authentication:"+principalDetails.getUsername());
        System.out.println("userDetails:"+userDetails.getUsername());
        return "세션정보확인하기";
    }
    @GetMapping("/test/ouath/login")
    public @ResponseBody String testOuathLogin(
            Authentication authentication,
            @AuthenticationPrincipal OAuth2User oauth) {


        System.out.println("/test/ouath/login ===============");
        /* System.out.println("authentication:"+authentication.getPrincipal()); */
        OAuth2User oauth2User=(OAuth2User)authentication.getPrincipal();
        System.out.println("authentication:"+oauth2User.getAttributes());
        System.out.println("oauth2User:"+oauth.getAttributes());
        return "OAuth 세션정보확인하기";
    }

/*    @GetMapping("/userinfo")
    public UserDto userinfo(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        // principalDetails에서 UserDto를 얻어서 반환
        //System.out.println(principalDetails.getUserDto());
        return principalDetails.getUserDto();
    }*/

    // Refresh Token을 사용해 새로운 Access Token을 발급하는 엔드포인트
    @PostMapping("/token/refresh")
    public Map<String, String> refreshAccessToken(HttpServletRequest request) {
        Map<String, String> response = new HashMap<>(); // 응답 데이터를 저장할 Map 생성

        try {
            // 쿠키에서 Refresh Token을 가져옴
            String refreshToken = null;
            if (request.getCookies() != null) {
                for (var cookie : request.getCookies()) {
                    if (cookie.getName().equals("refreshToken")) { // 쿠키 이름이 "refreshToken"인지 확인
                        refreshToken = cookie.getValue(); // Refresh Token 값 가져오기
                    }
                }
            }
            //쿠키에 저장된 refreshtoken가 만료됨
            if (refreshToken == null) {
                // Refresh Token이 없으면 오류 메시지 반환
                response.put("error", "Refresh Token is missing");
                return response;
            }

            // TokenService를 사용해 새로운 Access Token 발급
            String newAccessToken = tokenService.refreshAccessToken(refreshToken);

            if (newAccessToken != null) {
                // 새로운 Access Token이 발급된 경우 응답에 추가
                response.put("access_token", newAccessToken);
            } else {
                // Refresh Token이 유효하지 않거나 만료된 경우 오류 메시지 반환
                response.put("error", "Invalid or expired Refresh Token");
            }
        } catch (Exception e) {
            // 예외 발생 시 오류 메시지 반환
            response.put("error", "An error occurred while refreshing token");
        }

        return response; // 응답 반환
    }

    @GetMapping("/oauth/logout")
    public String oauthLogout(HttpServletRequest request) {
        // 여기서 토큰을 가지고 로그아웃 처리 로직을 구현합니다.
        // 예: 토큰 유효성 검사, 토큰 무효화, 사용자 로그아웃 처리 등
        //jwt로 사용자의 정보를 받은후, 걔 id에서 provider로 카카오네이버구글인지 따지고, 주소로 보내줘야됨

        UserDto userDto = jwtService.getUserFromJwt(request);

        if (userDto != null && "kakao".equals(userDto.getUserProvider())) {
            // Kakao 로그아웃 처리
            return logoutService.logoutFromKakao();
        } else {
            return "Logout failed. User not found or provider not supported.";
        }



    }
}