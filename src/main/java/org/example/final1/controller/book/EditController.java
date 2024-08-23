package org.example.final1.controller.book;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SectionDto;
import org.example.final1.service.QuestionService;
import org.example.final1.service.SectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class EditController {

    private final SectionService sectionService;
    private final QuestionService questionService;

    // 섹션 생성
    @PostMapping("/section/new")
    public ResponseEntity<SectionDto> insertSection(@RequestBody SectionDto dto) {
        SectionDto saved = sectionService.saveSection(dto);
        return ResponseEntity.ok(saved);
    }

    // 섹션 정렬
    @PostMapping("/section/sort")
    public ResponseEntity<List<SectionDto>> sortSection(@RequestBody List<SectionDto> sectionList) {
        List<SectionDto> list = sectionService.saveSections(sectionList);
        return ResponseEntity.ok(list);
    }

    // 섹션 삭제
    @DeleteMapping("/section/delete/{id}")
    public ResponseEntity<Void> deleteSection(@PathVariable("id") Long id) {
        sectionService.deleteSection(id);
        return ResponseEntity.noContent().build();
    }

    // 질문 생성
    @PostMapping("/question/new")
    public ResponseEntity<QuestionDto> insertQuestion(@RequestBody QuestionDto dto) {
        QuestionDto saved = questionService.saveQuestion(dto);
        return ResponseEntity.ok(saved);
    }

    // 질문 삭제
    @DeleteMapping("/question/delete/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable("id") Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

}
