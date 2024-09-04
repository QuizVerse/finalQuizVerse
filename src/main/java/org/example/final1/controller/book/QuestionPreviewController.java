package org.example.final1.controller.book;

import org.example.final1.model.BookDto;
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
    private final BookService bookService;  // final로 선언

    // 생성자에서 두 개의 서비스 클래스를 주입 받음
    public QuestionPreviewController(QuestionService questionService, BookService bookService) {
        this.questionService = questionService;
        this.bookService = bookService;  // 여기서 bookService를 초기화
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

    @GetMapping("/detail/{id}")
    public ResponseEntity<BookDto> getBookDetail(@PathVariable("id") int bookId) {
        BookDto book = bookService.getBookByBookId(bookId);
        if (book == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(book);
        }
    }
}
