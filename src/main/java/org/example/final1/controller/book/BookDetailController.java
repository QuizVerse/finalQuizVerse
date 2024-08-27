package org.example.final1.controller.book;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/book")
public class BookDetailController {

    private final BookService bookService;

    @GetMapping("{id}")
    public ResponseEntity<BookDto> getBookDetail(@PathVariable Long id) {
        Optional<BookDto> book = bookService.getBookById(id);
        if (book.isPresent()) {
            return ResponseEntity.ok(book.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
