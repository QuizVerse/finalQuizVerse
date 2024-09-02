package org.example.final1.controller.mypage;

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
    private LeaveService leaveService;

    @PostMapping("/leave-reason")
    public ResponseEntity<String> leave(@RequestBody LeaveDto leaveDto) {
        try {
            leaveService.saveLeaveReason(leaveDto.getLeaveReason());
            return ResponseEntity.ok("탈퇴 사유가 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            e.printStackTrace(); // 오류 로그 기록
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }
}
