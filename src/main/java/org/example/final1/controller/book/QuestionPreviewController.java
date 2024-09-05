package org.example.final1.controller.book;

import org.example.final1.model.QuestionDto;
import org.example.final1.service.BookService;
import org.example.final1.service.QuestionService;
import org.springframework.http.HttpStatus;
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
    // 배점 저장 요청을 처리하는 엔드포인트
    @PostMapping("/question/saveScore/{id}")
    public ResponseEntity<String> saveQuestionScores(@PathVariable("id") int bookId, @RequestBody List<QuestionDto> questions) {
        try {
            System.out.println("Received questions: " + questions);  // 디버깅용 출력

            questionService.updateQuestionPoints(questions);
            return ResponseEntity.ok("배점 저장 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("배점 저장 실패");
        }
    }
}
