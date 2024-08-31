package org.example.final1.config.oauth;

import org.example.final1.config.auth.PrincipalDetails;
import org.example.final1.config.oauth.provider.GoogleUserInfo;
import org.example.final1.config.oauth.provider.KakaoUserInfo;
import org.example.final1.config.oauth.provider.NaverUserInfo;
import org.example.final1.config.oauth.provider.OAuth2UserInfo;
import org.example.final1.model.UserDto;
import org.example.final1.repository.User.UserDaoInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    private static final String DEFAULT_USER_IMAGE_URL = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/loopy.png";


    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserDaoInter userDaoInter;

    //구글로부터 받은 userRequest 데이터에 대한 후처리되는함수
    //함수 종료시 @AuthenticationPricipal 어노테이션이 만드어진다.
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//System.out.println("userRequest: "+userRequest);
//userRequest: org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest@39bcdaa4
/*
   userRequest: OAuth2UserRequest 객체를 출력합니다.
   이 객체는 Spring Security에서 OAuth2 인증을 처리할 때 사용되며,
   현재 OAuth2 인증 요청에 대한 정보를 포함하고 있습니다.
   여기에는 클라이언트 등록 정보, 액세스 토큰, 스코프 등이 포함됩니다.
*/

//System.out.println("getClientRegistration: "+userRequest.getClientRegistration());
/*
   getClientRegistration: OAuth2UserRequest 객체에서 클라이언트 등록 정보를 출력합니다.
   클라이언트 등록 정보는 OAuth2 인증 요청이 어떤 클라이언트를 통해 이루어졌는지에 대한 정보입니다.
   여기에는 클라이언트 ID, 클라이언트 이름, 인증 제공자(Google, Facebook 등)의 세부 정보가 포함됩니다.
*/

//System.out.println("getAccessToken: "+userRequest.getAccessToken());
/*
   getAccessToken: OAuth2UserRequest 객체에서 액세스 토큰 정보를 출력합니다.
   이 토큰은 사용자가 OAuth2 제공자(예: Google)에서 인증을 마친 후 발급된 토큰입니다.
   서버는 이 토큰을 사용하여 사용자 정보를 가져오거나 다른 보호된 리소스에 접근할 수 있습니다.
*/

//System.out.println("getAttributes: "+super.loadUser(userRequest).getAttributes());
/*
   getAttributes: OAuth2UserRequest를 기반으로 OAuth2User 객체에서 사용자 속성을 출력합니다.
   이 속성은 OAuth2 제공자로부터 가져온 사용자 프로필 정보(예: 이름, 이메일, 프로필 사진 URL 등)입니다.
   super.loadUser(userRequest)를 호출하면 OAuth2 제공자와의 통신을 통해 사용자의 정보를 가져오고,
   getAttributes() 메서드는 이러한 정보를 맵(Map) 형태로 반환합니다.
*/

        //구글 로그인 클릭 -> 구글 로그인 창-> 로그인 완료-> code리턴(oauth-client라이브러리를 통해)
        //->access token요청 ->//userrequest정보-> 회원 프로필 받음(loadUser함수)->회원 프로필받기
        String accessToken = userRequest.getAccessToken().getTokenValue();
        //회원 가입 강제로 진행
        OAuth2User oauth2User = super.loadUser(userRequest);
        //System.out.println("getAttributes:"+oauth2User.getAttributes());

        OAuth2UserInfo oAuth2UserInfo=null;
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            // 구글 로그인 요청
            oAuth2UserInfo = new GoogleUserInfo(oauth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            // 네이버 로그인 요청
            oAuth2UserInfo = new NaverUserInfo((Map) oauth2User.getAttributes().get("response"));
        }
        else if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            // 카카오 로그인 요청
            oAuth2UserInfo = new KakaoUserInfo(oauth2User.getAttributes());
        }


        String user_provider=oAuth2UserInfo.getProvider();
        /* System.out.println("provider:"+provider); */
        String user_providerId=oAuth2UserInfo.getProviderId();
        String user_nickname=user_provider+"_"+user_providerId;//google_107266997861777995095->user_nickname충돌 x
        String user_password=bCryptPasswordEncoder.encode("퀴즈버스");
        String user_email=oAuth2UserInfo.getEmail();
        String user_role="ROLE_USER";



        UserDto userDto=userDaoInter.findByEmail(user_email);

        if(userDto==null) {
            System.out.println("OAuth이 최초입니다.");
            userDto=UserDto.builder()
                    .userEmail(user_email)
                    .userPassword(user_password)
                    .userNickname(user_nickname)
                    .userRole(user_role)
                    .userProvider(user_provider)
                    .userProviderid(user_providerId)
                    .userImage(DEFAULT_USER_IMAGE_URL)
                    .userAccessToken(accessToken)
                    .build();
            userDaoInter.save(userDto);

        }else {
            //System.out.println("로그인을 이미 한적이있습니다. 당신은 자동회원가입이 되어있습니다.");
        }

        return new PrincipalDetails(userDto,oauth2User.getAttributes());
    }
}
