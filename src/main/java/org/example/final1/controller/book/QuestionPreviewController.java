package org.example.final1.controller.book;

import org.example.final1.model.BookDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.service.BookService;
import org.example.final1.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
//
//@RestController
//@RequestMapping("/book")
//public class QuestionPreviewController {
//
//    private final QuestionService questionService;
//    private final BookService bookService;
//
//    public QuestionPreviewController(QuestionService questionService, BookService bookService) {
//        this.questionService = questionService;
//        this.bookService = bookService;
//    }
//
//    @GetMapping("/questionpreview/{id}")
//    public ResponseEntity<List<QuestionDto>> getQuestionsByBookId(@PathVariable("id") int bookId) {
//        List<QuestionDto> questions = questionService.getQuestionsByBookId(bookId);
//        if (questions == null || questions.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        } else {
//            return ResponseEntity.ok(questions);
//        }
//    }
//    // 배점 저장 요청을 처리하는 엔드포인트
//    @PostMapping("/question/saveScore/{id}")
//    public ResponseEntity<String> saveQuestionScores(@PathVariable("id") int bookId, @RequestBody List<QuestionDto> questions) {
//        try {
//            Optional<BookDto> bookOpt = bookService.getBookById(bookId);
//
//            if (bookOpt.isPresent()) {
//                BookDto book = bookOpt.get();
//                book.setBookIspublished(true);
//                bookService.saveBook(book);
//
//                System.out.println("Received questions: " + questions);  // 디버깅용 출력
//                questionService.updateQuestionPoints(questions);
//                // 저장된 책 정보를 클라이언트에 반환
//                return ResponseEntity.ok("배점 저장 성공");
//            } else {
//                return ResponseEntity.notFound().build();
//            }
//
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("배점 저장 실패");
//        }
//    }
//    @GetMapping("/questionpreviewPDF/{id}")
//    public ResponseEntity<List<QuestionDto>> getQuestionsByBookIdToPDF(@PathVariable("id") int bookId) {
//        List<QuestionDto> questions = questionService.getQuestionsByBookId(bookId);
//        if (questions == null || questions.isEmpty()) {
//            return ResponseEntity.noContent().build();
//        } else {
//            return ResponseEntity.ok(questions);
//        }
//    }
//}

@RestController
@RequestMapping("/book")
public class QuestionPreviewController {

    private final QuestionService questionService;
    private final BookService bookService;

    public QuestionPreviewController(QuestionService questionService, BookService bookService) {
        this.questionService = questionService;
        this.bookService = bookService;
    }

    // Fetch questions by book ID
    @GetMapping("/questionpreview/{id}")
    public ResponseEntity<List<QuestionDto>> getQuestionsByBookId(@PathVariable("id") int bookId) {
        List<QuestionDto> questions = questionService.getQuestionsByBookId(bookId);
        if (questions.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(questions);
        }
    }

    // Save or update question scores
    @PostMapping("/question/saveScore/{id}")
    public ResponseEntity<String> saveQuestionScores(@PathVariable("id") int bookId, @RequestBody List<QuestionDto> questions) {
        try {
            Optional<BookDto> bookOpt = bookService.getBookById(bookId);
            if (bookOpt.isPresent()) {
                BookDto book = bookOpt.get();
                book.setBookIspublished(true);
                bookService.saveBook(book);

                questionService.updateQuestionPoints(questions);
                return ResponseEntity.ok("Scores saved successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save scores");
        }
    }

    // Optionally fetch questions for PDF generation with additional logic if needed
    @GetMapping("/questionpreviewPDF/{id}")
    public ResponseEntity<List<QuestionDto>> getQuestionsByBookIdForPDF(@PathVariable("id") int bookId) {
        List<QuestionDto> questions = questionService.getQuestionsByBookId(bookId);
        if (questions.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(questions);
        }
    }
}
