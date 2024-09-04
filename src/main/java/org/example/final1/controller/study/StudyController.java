package org.example.final1.controller.study;

import java.util.List;

import org.example.final1.model.StudyDto;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/studys")
public class StudyController {
    private final StudyService studyService;
    private final JwtService jwtService;

    
    @GetMapping("/lists")
    public List<StudyDto> getAllRoom()
    {
        return studyService.getAllRoom();
    }

    @PostMapping("/inserts")
    public void insertRoom(@RequestBody StudyDto dto)
    {
        studyService.insertRoom(dto);
    }   
    
}
