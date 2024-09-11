package org.example.final1.controller.account;


import lombok.RequiredArgsConstructor;

import org.example.final1.model.UserDto;
import org.example.final1.service.EmailService;
import org.example.final1.service.UserService;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random;

import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/signup")
public class SignupController {
    private static final String DEFAULT_USER_IMAGE_URL = "20240911_6ac956c7-d28e-4d24-b2ce-60726afe29a6";

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserService userService;
    private final EmailService emailService;


    // 이메일 주소와 인증 코드를 매핑하여 저장하는 ConcurrentHashMap
    /*  hashmap보다 동시성과 보안을 더 충족시켜줌
    ConcurrentHashMap은 여러 스레드가 동시에 접근하더라도 안전하게 데이터를 저장하고 읽을 수 있도록 설계된 동시성 지원 컬렉션입니다.
    ConcurrentHashMap은 내부적으로 세분화된 잠금(Segment Locking) 메커니즘을 사용합니다. 이로 인해 HashMap을 synchronized 블록으로 감싸는 것보다 성능이 더 뛰어날 수 있습니다.
    ConcurrentHashMap은 전체 맵을 잠그지 않고, 특정 버킷(bucket)만 잠금 처리하기 때문에 동시성이 필요한 상황에서도 높은 성능을 유지합니다.
    * */
    private Map<String, String> authenticationCodes = new ConcurrentHashMap<>();

    // 이메일 인증 코드 보내기 및 재발송
    @GetMapping("/user/send")
    public String sendAuthenticationCode(@RequestParam("user_email") String user_email) {

        // 이메일 존재 여부 확인
        if (userService.getEmailcheck(user_email)) {
            return "이메일이 존재하는 회원입니다.";
        }

        String authenticationCode = String.format("%06d", new Random().nextInt(999999));  // 6자리 인증 코드 생성
        try {
            // 이메일로 인증 코드 발송
            emailService.sendVerificationEmail(user_email, authenticationCode);
            // 이메일 주소를 키로, 인증 코드를 값으로 저장 -> 메모리에 저장됨
            authenticationCodes.put(user_email, authenticationCode);

            return "success";
        } catch (Exception e) {
            e.printStackTrace(); // 예외 출력
            return "fail"; // 예외 발생 시 실패 응답 반환
        }
    }
    // 이메일 인증 코드 확인
    @GetMapping("/user/emailcheck")
    public String verifyCode(@RequestParam("user_email") String user_email, @RequestParam("auth_code") String auth_code) {
        String savedCode = authenticationCodes.get(user_email);
        if (savedCode != null && savedCode.equals(auth_code)) {
            return "success";
        } else {
            return "fail";
        }
    }


    //닉네임 중복체크
    @GetMapping("/user/nicknamecheck")
    public String isNicknamecheck(@RequestParam("user_nickname")String user_nickname){
        if(userService.getNicknamecheck(user_nickname))//중복닉네임 있음
            return "false";
        else
            return "success";
    }



    //비밀번호 암호화 후 저장
    @PostMapping("/user/join")
    public String joinUser(@RequestBody UserDto userDto) {
        String originPw=userDto.getUserPassword();
        String encodePw=bCryptPasswordEncoder.encode(originPw);
        userDto.setUserPassword(encodePw);
        userDto.setUserImage(DEFAULT_USER_IMAGE_URL);

        userService.saveUser(userDto);

        // 가입이 완료되면 인증 코드를 제거
        authenticationCodes.remove(userDto.getUserEmail());
        return "/";



    }


}
