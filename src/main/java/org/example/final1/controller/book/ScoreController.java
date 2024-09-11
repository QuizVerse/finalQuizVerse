//package org.example.final1.controller.book;
//
//
//import org.example.final1.model.AnswerDto;
//import org.example.final1.model.BookDto;
//import org.example.final1.model.QuestionDto;
//import org.example.final1.service.AnswerService;
//import org.example.final1.service.BookService;
//import org.example.final1.service.QuestionService;
//import org.example.final1.service.ScoreService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/book")
//public class ScoreController {
//
//    private final BookService bookService;
//    private final QuestionService questionService;
//    private final AnswerService answerService;
//
//    public ScoreController(BookService bookService, QuestionService questionService, AnswerService answerService, ScoreService scoreService) {
//        this.bookService = bookService;
//        this.questionService = questionService;
//        this.answerService = answerService;
//    }
//
//    @GetMapping("/score/{id}")
//    public ResponseEntity<BookDto> getScoreInfo(@PathVariable("id") int id) {
//        BookDto bookDto = bookService.getBookByBookId(id);
//        if(bookDto == null) {
//            return ResponseEntity.noContent().build();
//        } else {
//            return ResponseEntity.ok(bookDto);
//        }
//    }
//
//    @GetMapping("/scorepreview/{id}")
//    public ResponseEntity<BookDto> getScorePreview(@PathVariable("id") int id) {
//        BookDto bookDto = bookService.getBookByBookId(id);
//        if (bookDto == null) {
//            return ResponseEntity.noContent().build();
//        } else {
//            return ResponseEntity.ok(bookDto);
//        }
//    }
//
//
//    @GetMapping("/score/{bookId}/{solvedId}")
//    public ResponseEntity<Map<String, Object>> getScore(
//            @PathVariable("bookId") int bookId,
//            @PathVariable("solvedId") int solvedId,
//            @RequestParam("wrongRepeat") int wrongRepeat) {
//        // 정답 개수 / 전체 문항 수를 계산
//        Map<String, Object> scoreResult = answerService.calculateScore(bookId, solvedId, wrongRepeat);
//        return ResponseEntity.ok(scoreResult);
//    }
//
//    // 특정 solvedbookId의 맞힌 문제 총 점수를 반환하는 API
//    @GetMapping("/score/userpoint/{solvedbookId}")
//    public ResponseEntity<Integer> getTotalCorrectPoints(@PathVariable("solvedbookId") int solvedbookId) {
//        int totalPoints = answerService.calculateTotalCorrectPoints(solvedbookId);
//        return ResponseEntity.ok(totalPoints);
//    }
//
//    @GetMapping("/score/questions/{book}")
//    public ResponseEntity<List<QuestionDto>> getQuestionsByBookId(@PathVariable("book") int book) {
//        List<QuestionDto> questions = questionService.getQuestionsByBookId(book);
//        if (questions == null || questions.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.ok(questions);
//    }
//    @GetMapping("/score/answers/{solvedbookId}/{wrongRepeat}")
//    public ResponseEntity<List<AnswerDto>> getAnswers(@PathVariable("solvedbookId") int solvedbookId,
//                                                      @PathVariable("wrongRepeat") int wrongRepeat) {
//        List<AnswerDto> answers = answerService.getAnswersBySolvedbookAndWrongRepeat(solvedbookId, wrongRepeat);
//        return ResponseEntity.ok(answers);
//    }
//}
