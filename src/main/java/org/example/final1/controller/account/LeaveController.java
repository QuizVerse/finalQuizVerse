package org.example.final1.controller.account;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.final1.jwt.JwtTokenProvider;
import org.example.final1.model.UserDto;
import org.example.final1.service.EmailService;
import org.example.final1.service.JwtService;
import org.example.final1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/leave")
public class LeaveController {
    @Autowired
    UserService userservice;

    @Autowired
    JwtService jwtService;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;
    private Map<String, String> leaveAuthcode = new ConcurrentHashMap<>();

   /* // 회원 탈퇴 요청 처리 (기존)
    @GetMapping("/account")
    public String leaveAccount(HttpServletRequest request) {
        UserDto user = jwtService.getUserFromJwt(request);
        userService.deleteUserById(user.getUserId());
        return "success";
    }*/

    // 1. 인증 코드 전송 (POST /leave/email)
    @PostMapping("/email")
    public ResponseEntity<String> sendVerificationCode(HttpServletRequest request) {
        UserDto user = jwtService.getUserFromJwt(request);

        String userEmail = user.getUserEmail();
        String authenticationCode = String.format("%06d", new Random().nextInt(999999));  // 6자리 인증 코드 생성
        try {
            // 이메일로 인증 코드 발송
            emailService.sendVerificationEmail(userEmail, authenticationCode);

            // 이메일 주소를 키로, 인증 코드를 값으로 저장 -> 메모리에 저장됨
            leaveAuthcode.put(userEmail, authenticationCode);

            // 성공 응답 반환
            return ResponseEntity.ok("인증코드가 이메일로 전송되었습니다.");
        } catch (Exception e) {
            e.printStackTrace(); // 예외 출력

            // 예외 발생 시 실패 응답 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("인증코드 전송에 실패했습니다.");
        }
    }


    // 2. 인증 코드 검증 (POST /leave/verify)
    @PostMapping("/verify")
    public ResponseEntity<Map<String, Boolean>> verifyCode(@RequestBody Map<String, String> requestBody, HttpServletRequest request) {

        // JWT에서 사용자 정보 가져오기
        UserDto user = jwtService.getUserFromJwt(request);
        String userEmail = user.getUserEmail();  // 사용자의 이메일

        // 클라이언트에서 보낸 인증 코드
        String userEnteredCode = requestBody.get("code");

        // 저장된 인증 코드 가져오기
        String storedAuthCode = leaveAuthcode.get(userEmail);

        // 인증 코드 일치 여부 확인
        boolean isValid = userEnteredCode != null && userEnteredCode.equals(storedAuthCode);

        // 응답 생성
        Map<String, Boolean> response = new HashMap<>();
        response.put("success", isValid);

        if (isValid) {
            return ResponseEntity.ok(response);  // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);  // 400 Bad Request
        }
    }

    // 3. 비밀번호 인증 (POST /leave/verify-password)
    @PostMapping("/verify-password")
    public ResponseEntity<Map<String, Boolean>> verifyPassword(@RequestBody Map<String, String> requestBody, HttpServletRequest request) {
        UserDto user = jwtService.getUserFromJwt(request);
        String enteredPassword = requestBody.get("password");

        // 비밀번호 비교 (DB에 저장된 암호화된 비밀번호와 비교)
        boolean isPasswordCorrect = bCryptPasswordEncoder.matches(enteredPassword, user.getUserPassword());

        Map<String, Boolean> response = new HashMap<>();
        response.put("success", isPasswordCorrect);

        return ResponseEntity.ok(response);
    }
}
