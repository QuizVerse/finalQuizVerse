package org.example.final1.controller.book;

import org.example.final1.model.BookDto;
import org.example.final1.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SearchbookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/books/search")
    public List<BookDto> searchBooks(@RequestParam("keyword") String keyword) {
        return bookService.searchBooks(keyword);
    }
}
