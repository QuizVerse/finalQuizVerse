package org.example.final1.controller.book;

import org.example.final1.model.QuestionDto;
import org.example.final1.service.BookService;
import org.example.final1.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
public class QuestionPreviewController {

    private final QuestionService questionService;

    public QuestionPreviewController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/questionpreview/{id}")
    public ResponseEntity<List<QuestionDto>> getQuestionsByBookId(@PathVariable("id") int bookId) {
        List<QuestionDto> questions = questionService.getQuestionsByBookId(bookId);
        if (questions == null || questions.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(questions);
        }
    }
}
