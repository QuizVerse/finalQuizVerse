package org.example.final1.controller.book;

import java.util.List;

import org.example.final1.model.BookDto;
import org.example.final1.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    // 로그인한 사용자 정보 가져오기
    // @GetMapping("/username")
    // public ResponseEntity<UserDto> getUserInfo(HttpServletRequest request) {
    //     UserDto userDto = jwtService.getUserFromJwt(request);
    //     if (userDto == null) {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    //     }
    //     return ResponseEntity.ok(userDto);
    // }
}

