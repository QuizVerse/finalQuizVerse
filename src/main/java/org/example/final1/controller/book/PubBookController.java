package org.example.final1.controller.book;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.example.final1.model.BookDto;
import org.example.final1.service.BookService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
@RequestMapping("/publishedbook")
public class PubBookController {

    private final BookService bookService;

    @GetMapping("/get")
    public List<BookDto> getMethodName(@RequestParam("userId") int userId) {
        return bookService.getBooksByUserId(userId);
    }
    
}
