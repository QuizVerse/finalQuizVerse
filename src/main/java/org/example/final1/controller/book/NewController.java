package org.example.final1.controller.book;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.service.NewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import storage.NcpObjectStorageService;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/new")
@SuppressWarnings("java:S1220")
public class NewController {

    private final NewService newService;

    @PostMapping("/newbook")
    public ResponseEntity<BookDto> newBook(@RequestBody BookDto bookDto) {
        BookDto savedbook = newService.saveBook(bookDto);
        return ResponseEntity.ok(savedbook);
    }

}
