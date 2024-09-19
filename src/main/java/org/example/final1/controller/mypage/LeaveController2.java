package org.example.final1.controller.mypage;

import jakarta.servlet.http.HttpServletRequest;
import org.example.final1.model.UserDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.SolvedbookRepository;
import org.example.final1.service.JwtService;
import org.springframework.http.HttpStatus;
import org.example.final1.model.LeaveDto;
import org.example.final1.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LeaveController2 {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private LeaveService leaveService;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private SolvedbookRepository solvedbookRepository;

    @PostMapping("/leave-reason")
    public ResponseEntity<String> leave(@RequestBody LeaveDto leaveDto, HttpServletRequest request) {

        UserDto usreDto=jwtService.getUserFromJwt(request);



        // leaveReason이 null 또는 빈 값인지 확인
        if (leaveDto.getLeaveReason() == null || leaveDto.getLeaveReason().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("탈퇴 사유는 필수 입력 사항입니다.");
        }

        try {
            // leaveDto를 서비스로 전달
            leaveService.saveLeaveReason(leaveDto);

            leaveService.deleteUserById(usreDto.getUserId());



            return ResponseEntity.ok("탈퇴 사유가 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            e.printStackTrace(); // 오류 로그 기록
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }



    }
}
