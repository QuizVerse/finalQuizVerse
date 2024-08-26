package org.example.final1.controller.book;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookListController {

    private final BookService bookService;

    // 특정 카테고리에 속한 책 리스트를 반환하는 엔드포인트
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<BookDto>> getBooksByCategory(@PathVariable int categoryId) {
        List<BookDto> books = bookService.getBooksByCategory(categoryId);
        return ResponseEntity.ok(books);
    }

    // 모든 책 리스트를 반환하는 엔드포인트 (필요시)
    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks() {
        List<BookDto> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }
}