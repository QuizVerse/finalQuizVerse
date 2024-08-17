package org.example.final1.controller.mypage;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.ClassDto;
import org.example.final1.service.ClassService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/myclass")
public class MyclassController {

    private final ClassService classService;

    @PostMapping("/newclass")
    public ResponseEntity<ClassDto> insertClass(@RequestBody ClassDto dto) {
        ClassDto savedClass = classService.saveClass(dto);
        return ResponseEntity.ok(savedClass);
    }

}
