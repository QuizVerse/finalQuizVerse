package org.example.final1.controller.study;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.example.final1.model.BookDto;
import org.example.final1.model.ClassDto;
import org.example.final1.model.StudyDto;
import org.example.final1.model.StudymemberDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.JwtService;
import org.example.final1.service.StudyService;
import org.example.final1.storage.NcpObjectStorageService;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/studys")
public class StudyController {
    private final StudyService studyService;
    private final JwtService jwtService;
    private final NcpObjectStorageService storageService;

    private String bucketName="bitcamp701-129";
    private String folderName="final/study";

    @GetMapping("/lists")
    public ResponseEntity<List<StudyDto>> getAllRoom()
    {
        List<StudyDto> studyList = studyService.getAllRoom();
        return ResponseEntity.ok(studyList);
    }

    @PostMapping("/inserts")
    public ResponseEntity<Map<String, Object>> insertRoom(
            @RequestBody StudyDto studyDto,
            HttpServletRequest request)
    {
        // JWT 토큰에서 사용자 정보 가져오기
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 유효하지 않은 JWT 토큰 처리
        }

        studyDto.setUser(userDto);

        // 스터디 방 생성
        StudyDto createdStudy = studyService.insertRoom(studyDto, userDto);

        // 생성된 스터디 방 ID 반환
        Map<String, Object> response = new HashMap<>();
        response.put("studyId", createdStudy.getStudyId());

        System.out.println("생성된 studyId: " + createdStudy.getStudyId());  // 디버깅용 로그

        return ResponseEntity.ok(response); // 방 ID를 응답으로 반환
    }
    
    @PostMapping("/joins")
    public ResponseEntity<String> addStudyMember(
            @RequestParam("studyId") int studyId, 
            HttpServletRequest request) 
    {
        // JWT 토큰에서 사용자 정보 가져오기
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  // 유효하지 않은 JWT 토큰 처리
        }

       // 스터디에 사용자 추가
       studyService.addStudyMember(studyId, userDto);

       return ResponseEntity.ok("Member added successfully");
    }

    //사진만 먼저 업로드
    @PostMapping("/upload")
    public Map<String, String> uploadPhoto(@RequestParam("upload") MultipartFile upload)
    {
        System.out.println("photo upload>>"+upload.getOriginalFilename());
        //스토리지에 업로드후 업로드된 파일명 반환
        String photo=storageService.uploadFile(bucketName, folderName, upload);
        Map<String, String> map=new HashMap<>();
        map.put("photo", photo);
        return map;
    }
}
