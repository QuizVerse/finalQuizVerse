package org.example.final1.controller.study;

import java.util.List;

import org.example.final1.model.StudyDto;
import org.example.final1.service.StudyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/room")
public class StudyListController {
    private final StudyService studyService;
    
    @GetMapping("/list")
    public List<StudyDto> getAllRoom()
    {
        return studyService.getAllRoom();
    }
}
