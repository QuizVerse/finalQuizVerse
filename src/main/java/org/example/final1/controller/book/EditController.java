package org.example.final1.controller.book;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SectionDto;
import org.example.final1.service.QuestionService;
import org.example.final1.service.SectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class EditController {

    private final SectionService sectionService;
    private final QuestionService questionService;

    @PostMapping("/section/new")
    public ResponseEntity<SectionDto> insertSection(@RequestBody SectionDto dto) {
        SectionDto saved = sectionService.saveSection(dto);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/section/delete/{id}")
    public ResponseEntity<Void> deleteSection(@PathVariable Long id) {
        sectionService.deleteSection(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/question/new")
    public ResponseEntity<QuestionDto> insertQuestion(@RequestBody QuestionDto dto) {
        QuestionDto saved = questionService.saveQuestion(dto);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/question/delete/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
