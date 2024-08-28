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

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getBookDetail(@PathVariable("id") int id) {
        Optional<BookDto> book = bookService.getBookById(id);
        if (book.isPresent()) {
            System.out.println("있음");
            return ResponseEntity.ok(book.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
