package org.example.final1.controller.book;


import org.example.final1.model.BookDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.AnswerRepository;
import org.example.final1.service.AnswerService;
import org.example.final1.service.BookService;
import org.example.final1.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RestController
@RequestMapping("/book")
public class ScoreController {

    private final BookService bookService;
    private final QuestionService questionService;
    private final AnswerService answerService;

    public ScoreController(BookService bookService, QuestionService questionService, AnswerService answerService) {
        this.bookService = bookService;
        this.questionService = questionService;
        this.answerService = answerService;
    }

    @GetMapping("/score/{id}")
    public ResponseEntity<BookDto> getScoreInfo(@PathVariable("id") int id) {
        BookDto bookDto = bookService.getBookByBookId(id);
        if(bookDto == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(bookDto);
        }
    }

    @GetMapping("/scorepreview/{id}")
    public ResponseEntity<BookDto> getScorePreview(@PathVariable("id") int id) {
        BookDto bookDto = bookService.getBookByBookId(id);
        if (bookDto == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(bookDto);
        }
    }

    @GetMapping("/score/{bookId}/{solvedId}")
    public ResponseEntity<Map<String, Object>> getScore(
            @PathVariable("bookId") int bookId,
            @PathVariable("solvedId") int solvedId,
            @RequestParam("wrongRepeat") int wrongRepeat) {
        // 정답 개수 / 전체 문항 수를 계산
        Map<String, Object> scoreResult = answerService.calculateScore(bookId, solvedId, wrongRepeat);
        return ResponseEntity.ok(scoreResult);
    }
}
