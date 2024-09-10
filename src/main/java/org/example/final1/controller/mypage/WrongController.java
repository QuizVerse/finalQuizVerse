package org.example.final1.controller.mypage;


import jakarta.servlet.http.HttpServletRequest;
import org.example.final1.model.UserDto;
import org.example.final1.model.WrongDto;
import org.example.final1.service.JwtService;
import org.example.final1.service.WrongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/wrong")
public class WrongController {

    @Autowired
    private WrongService wrongService;

    @Autowired
    private JwtService jwtService;


    @GetMapping("/get/booklist")
    public ResponseEntity<?> getWrongNotesByUserId(HttpServletRequest request) {

        // JWT에서 사용자 정보 추출
        UserDto userDto = jwtService.getUserFromJwt(request);

        // 사용자 정보가 없으면 401 Unauthorized 응답
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        // 사용자 ID 추출
        Integer userId = userDto.getUserId();

        // 사용자 ID에 해당하는 오답 데이터를 Service에서 가져옵니다.
        List<WrongDto> wrongNotes = wrongService.getWrongBooksByUserId(userId);

        // 데이터 출력 (디버깅용)
        System.out.println(wrongNotes);

        // 데이터를 클라이언트에 반환
        return ResponseEntity.ok(wrongNotes);
    }

}
