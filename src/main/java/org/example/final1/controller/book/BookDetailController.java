package org.example.final1.controller.book;

import org.example.final1.model.BookDto;
import org.example.final1.model.ReviewDto;
import org.example.final1.service.ReviewService;
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

    public BookDetailController(BookService bookService, ReviewService reviewService) {
        this.bookService = bookService;
        this.reviewService = reviewService;
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
}
