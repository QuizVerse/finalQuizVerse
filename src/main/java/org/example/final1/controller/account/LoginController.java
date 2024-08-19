package org.example.final1.controller.account;

import org.example.final1.config.auth.PrincipalDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {


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

    @GetMapping("/user")
    public @ResponseBody String user(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("principalDetails:"+principalDetails.getUserDto());
        return "user";

    }

}