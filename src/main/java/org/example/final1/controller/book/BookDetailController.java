package org.example.final1.controller.book;

import org.example.final1.model.BookDto;
import org.example.final1.model.ReviewDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.service.ReviewService;
import org.example.final1.service.SolvedbookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.example.final1.service.BookService;

@RestController
@RequestMapping("/book")
public class BookDetailController {

    private final BookService bookService;
    private final ReviewService reviewService;
    private final SolvedbookService solvedbookService;

    public BookDetailController(BookService bookService, ReviewService reviewService, SolvedbookService solvedbookService) {
        this.bookService = bookService;
        this.reviewService = reviewService;
        this.solvedbookService = solvedbookService;
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<BookDto> getBookDetail(@PathVariable("id") int id) {
        BookDto book = bookService.getBookByBookId(id);
        if (book == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(book);
        }
    }

    // Review Detail
    @GetMapping("/review/{id}")
    public ResponseEntity<List<ReviewDto>> getReviewsByBookId(@PathVariable("id") int id) {
        List<ReviewDto> reviews = reviewService.getReviewsByBookId(id);
        if (reviews.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(reviews);
        }
    }

    @GetMapping("/detail/{solvedbookId}")
    public ResponseEntity<BookDto> getBookDetailBySolvedbookId(
            @PathVariable("solvedbookId") int solvedbookId,
            @RequestParam(value = "wrongRepeat", required = false) Integer wrongRepeat) {

        // solvedbookId로 SolvedBookDto에서 bookId를 찾아온다
        Optional<SolvedbookDto> solvedbookOptional = solvedbookService.getBookIdBySolvedbookId(solvedbookId);

        if (solvedbookOptional.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        int bookId = solvedbookOptional.get().getBook().getBookId();  // SolvedbookDto에서 bookId를 가져옴
        BookDto book = bookService.getBookByBookId(bookId);           // bookId로 BookDto를 가져옴

        if (book == null) {
            return ResponseEntity.noContent().build();
        } else {
            // 추가 처리: wrongRepeat이 존재하면 로직 추가 가능
            if (wrongRepeat != null) {
                // wrongRepeat 관련 로직을 여기에 추가
                System.out.println("wrongRepeat: " + wrongRepeat);
            }

            return ResponseEntity.ok(book);
        }
    }



}

