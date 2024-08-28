package org.example.final1.controller.book;

import org.example.final1.model.BookDto;
import org.example.final1.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookListController {

    @Autowired
    private BookService bookService;

    @GetMapping("/category")
    public ResponseEntity<List<BookDto>> getBooksByCategory(@RequestParam("id") Integer categoryId) {
        List<BookDto> books = bookService.getBooksByCategory(categoryId);
        return ResponseEntity.ok(books);
    }
}


// package org.example.final1.controller.book;

// import org.example.final1.model.BookDto;
// import org.example.final1.service.BookService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/books")
// public class BookListController {

//     private final BookService bookService;

//     public BookListController(BookService bookService) {
//         this.bookService = bookService;
//     }

//     @GetMapping("/category")
//     public ResponseEntity<List<BookDto>> getBooksByCategory(@RequestParam("id") int id) {
//         List<BookDto> books = bookService.getBooksByCategory(id);
//         return ResponseEntity.ok(books);
//     }
// }
