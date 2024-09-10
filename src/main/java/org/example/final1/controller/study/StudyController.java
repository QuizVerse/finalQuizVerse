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
    public void insertRoom(@RequestBody StudyDto dto)
    {
        studyService.insertRoom(dto);
    }   
    
    @GetMapping("/dtos")
    public StudyDto StudyRoomDto(@RequestParam("study_id") int studyId)
    {
        System.out.println("111111");
        return studyService.StudyRoomDto(studyId);
    }
}
