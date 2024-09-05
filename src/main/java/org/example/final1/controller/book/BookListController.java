package org.example.final1.controller.book;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import org.example.final1.model.BookDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.BookService;
import org.example.final1.service.JwtService;
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
    @Autowired
    private  JwtService jwtService;

    @GetMapping("/category")
    public ResponseEntity<List<BookDto>> getBooksByCategory(@RequestParam("id") Integer categoryId) {
        List<BookDto> books = bookService.getBooksByCategory(categoryId);
        return ResponseEntity.ok(books);
    }

    // 로그인 상태 확인용 컨트롤러
    @GetMapping("/auth/check")
    public ResponseEntity<Boolean> checkLoginStatus(HttpServletRequest request) {
        UserDto userDto = jwtService.getUserFromJwt(request);

        // 유저 정보가 null이면 로그인되지 않은 상태로 응답
        if (userDto == null) {
            return ResponseEntity.ok(false);  // 로그인 안 됨
        }

        // 유저 정보가 있으면 로그인된 상태로 응답
        return ResponseEntity.ok(true);  // 로그인 됨
    }

}

