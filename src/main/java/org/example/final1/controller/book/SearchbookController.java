package org.example.final1.controller.book;

import jakarta.servlet.http.HttpServletRequest;
import org.example.final1.model.BookDto;
import org.example.final1.model.BookResponseDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.BookService;
import org.example.final1.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SearchbookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/books/search")
    public ResponseEntity<List<BookResponseDto>> searchBooks(@RequestParam("keyword") String keyword, HttpServletRequest request) {
        try {
            List<BookResponseDto> books = bookService.searchBooks(keyword);
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
