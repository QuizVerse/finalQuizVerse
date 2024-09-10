package org.example.final1.controller.study;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.example.final1.model.BookDto;
import org.example.final1.model.ClassDto;
import org.example.final1.model.StudyDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.JwtService;
import org.example.final1.service.StudyService;
import org.example.final1.storage.NcpObjectStorageService;
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
    public List<StudyDto> getAllRoom()
    {
        return studyService.getAllRoom();
    }

    @PostMapping("/inserts")
    public void insertRoom(
            @RequestBody StudyDto studyDto,
            HttpServletRequest request)
    {
        // JWT 토큰에서 사용자 정보 가져오기
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto == null) return ; // 유효하지 않은 JWT 토큰 처리

        studyDto.setUser(userDto);

        // 스터디 저장
        studyService.insertRoom(studyDto);
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


    @GetMapping("/dtos")
    public StudyDto StudyRoomDto(@RequestParam("study_id") int studyId)
    {
        System.out.println("111111");
        return studyService.StudyRoomDto(studyId);
    }
}
