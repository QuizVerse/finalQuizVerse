package org.example.final1.controller.mypage;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.final1.model.UserDto;
import org.example.final1.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/update")
public class UpdateuserController {

    private final JwtService jwtService;


    @GetMapping("/user/data")
    public ResponseEntity<UserDto> getUserData(HttpServletRequest request) {
        UserDto userDto = jwtService.getUserFromJwt(request);

        if (userDto == null) {
            // 사용자 정보가 없을 경우 401 Unauthorized 응답 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } else {
            // 사용자 정보가 있을 경우, UserDto를 반환하여 클라이언트에 응답
            return ResponseEntity.ok(userDto);
        }
    }
}
