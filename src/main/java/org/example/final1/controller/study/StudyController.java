package org.example.final1.controller.study;

import java.util.List;

import org.example.final1.model.StudyDto;
import org.example.final1.model.StudymemberDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.JwtService;
import org.example.final1.service.StudyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studys")
public class StudyController {
    private final StudyService studyService;
    private final JwtService jwtService;

    
    @GetMapping("/lists")
    public ResponseEntity<List<StudyDto>> getAllRoom()
    {
        List<StudyDto> studyList = studyService.getAllRoom();
        return ResponseEntity.ok(studyList);
    }

    @PostMapping("/inserts")
    public ResponseEntity<String> insertRoom(@RequestBody StudyDto dto, HttpServletRequest request)
    {
        // JWT 토큰에서 사용자 정보 추출
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto != null) {
            // StudyDto에 사용자 정보를 설정
            dto.setUser(userDto);

            // 스터디 생성
            studyService.insertRoom(dto);
            
            // 스터디 생성
            studyService.insertRoom(dto);

            // StudyMember 생성
            StudymemberDto studymemberDto = StudymemberDto.builder()
                .study(dto)  // 생성된 Study의 ID 설정
                .user(userDto)  // 사용자 설정
                .userRole(1)  // 방장 역할 설정
                .build();

            studyService.saveStudyMember(studymemberDto); // StudyMember 저장

            return ResponseEntity.ok("Study room created successfully!");
        } else {
            return ResponseEntity.status(404).body("Invalid or missing JWT token");
        }
    }   
    
    @GetMapping("/dtos")
    public StudyDto StudyRoomDto(@RequestParam("study_id") int studyId)
    {
        System.out.println("111111");
        return studyService.StudyRoomDto(studyId);
    }
}
