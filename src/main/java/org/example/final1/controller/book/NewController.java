package org.example.final1.controller.book;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/book")
@SuppressWarnings("java:S1220")
public class NewController {

    private final BookService bookService;

    @PostMapping("/newbook") // service에서 작성한 것들을 여기서 매핑해서 사용
    public ResponseEntity<BookDto> newBook(@RequestBody BookDto bookDto) {
        BookDto savedbook = bookService.createBook(bookDto);
        return ResponseEntity.ok(savedbook);
    }

}
