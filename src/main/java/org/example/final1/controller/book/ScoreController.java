package org.example.final1.controller.book;


import org.example.final1.model.BookDto;
import org.example.final1.service.BookService;
import org.example.final1.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/book")
public class ScoreController {

//    @Autowired
//    private ScoreService scoreService;
    private final BookService bookService;

    public ScoreController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/score/{id}")
    public ResponseEntity<BookDto> getScoreInfo(@PathVariable("id") int id) {
        BookDto bookDto = bookService.getBookByBookId(id);
        if(bookDto == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(bookDto);
        }
    }

    @GetMapping("/scorepreview/{id}")
    public ResponseEntity<BookDto> getScorePreview(@PathVariable("id") int id) {
        BookDto bookDto = bookService.getBookByBookId(id);
        if(bookDto == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(bookDto);
        }
    }

}
