package org.example.final1.controller.book;


import org.example.final1.model.BookDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.AnswerRepository;
import org.example.final1.service.AnswerService;
import org.example.final1.service.BookService;
import org.example.final1.service.QuestionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/book")
public class ScoreController {

//    @Autowired
//    private ScoreService scoreService;
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

    @GetMapping("/correct/{bookId}")
    public Map<Integer, Boolean> getAnswerCorrectByBookId(@PathVariable int bookId) {
        // bookId로 questionIds를 가져옵니다.
        List<Integer> questionIds = questionService.getQuestionIdsByBookId(bookId);
        // questionIds로 정답 여부를 가져옵니다.
        return answerService.getAnswerCorrectByQuestionIds(questionIds);
    }

}
