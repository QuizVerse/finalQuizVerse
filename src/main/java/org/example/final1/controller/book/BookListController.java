package org.example.final1.controller.book;

import org.example.final1.model.BookDto;
import org.example.final1.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookListController {

    private final BookService bookService;

    public BookListController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/category")
    public ResponseEntity<List<BookDto>> getBooksByCategory(@RequestParam("id") int id) {
        List<BookDto> books = bookService.getBooksByCategory(id);
        return ResponseEntity.ok(books);
    }
}
