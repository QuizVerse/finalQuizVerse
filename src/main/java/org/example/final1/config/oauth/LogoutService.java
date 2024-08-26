package org.example.final1.config.oauth;


import org.example.final1.config.oauth.provider.GoogleUserInfo;
import org.example.final1.config.oauth.provider.KakaoUserInfo;
import org.example.final1.config.oauth.provider.NaverUserInfo;
import org.example.final1.config.oauth.provider.OAuth2UserInfo;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;

import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class LogoutService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        OAuth2UserInfo oAuth2UserInfo = null;

        // Determine which provider is being used
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
            OAuth2AccessToken oAuthAcess=userRequest.getAccessToken();
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            oAuth2UserInfo = new NaverUserInfo((Map) oAuth2User.getAttributes().get("response"));
            OAuth2AccessToken oAuthAcess=userRequest.getAccessToken();
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
            OAuth2AccessToken oAuthAcess=userRequest.getAccessToken();
        }else{
            return null;
        }





        return oAuth2User;
    }
}
