package org.example.final1.controller.account;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.UserDto;
import org.example.final1.repository.User.UserDaoInter;
import org.example.final1.service.EmailService;
import org.example.final1.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@RequestMapping("/change")
public class ChangepasswordController {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserService userService;
    private final EmailService emailService;
    private final UserDaoInter userDaoInter;
    private Map<String, String> ChangePasswordCodes = new ConcurrentHashMap<>();


    @GetMapping("/user/password")
    public String sendAuthenticationCode(@RequestParam("user_email") String user_email) {

        String authenticationCode = String.format("%06d", new Random().nextInt(999999));  // 6자리 인증 코드 생성
        try {
            // 이메일로 인증 코드 발송
            emailService.sendVerificationEmail(user_email, authenticationCode);
            // 이메일 주소를 키로, 인증 코드를 값으로 저장 -> 메모리에 저장됨
            ChangePasswordCodes.put(user_email, authenticationCode);

            return "success";
        } catch (Exception e) {
            e.printStackTrace(); // 예외 출력
            return "fail"; // 예외 발생 시 실패 응답 반환
        }
    }


    @GetMapping("/user/emailcheck")
    public String verifyCode(@RequestParam("user_email") String user_email, @RequestParam("auth_code") String auth_code) {
        String savedCode = ChangePasswordCodes.get(user_email);
        if (savedCode != null && savedCode.equals(auth_code)) {
            return "success";
        } else {
            return "fail";
        }
    }
    @GetMapping("/user/deletecode")
    public String deleteAuntenticationCode(@RequestParam("user_email")String user_email){
        if(ChangePasswordCodes.containsKey(user_email)){
            ChangePasswordCodes.remove(user_email);
            return "success";

        }else{
            return "fail";
        }
    }


    @PostMapping("/user/updatepassword")
    public String updatePassword(@RequestParam String user_email, @RequestParam String user_password) {
        // 1. 이메일로 사용자 조회
        UserDto user = userDaoInter.findByUserEmail(user_email);

        if (user == null) {
            // 사용자가 존재하지 않으면 실패 반환
            return "fail";
        }

        String encodedPassword = bCryptPasswordEncoder.encode(user_password);

        user.setUserPassword(encodedPassword);

        userDaoInter.save(user);


        return "success";
    }


}


