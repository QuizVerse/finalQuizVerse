package org.example.final1.config.oauth;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LogoutService {

    @Value("${kakao.logout.url}")
    private String kakaoLogoutUrl;

    @Value("${kakao.client.id}")
    private String kakaoclientId;

    @Value("${kakao.logout.redirect.uri}")
    private String kakaologoutRedirectUri;

    public String logoutFromKakao() {
        String url = kakaoLogoutUrl + "?client_id=" + kakaoclientId + "&logout_redirect_uri=" + kakaologoutRedirectUri;
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        return response;
    }

}
