// package org.example.final1.controller.mypage;

// import org.example.final1.model.BookDto;
// import org.example.final1.service.PublishedBookService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import lombok.RequiredArgsConstructor;

// import java.util.List;

// @RestController
// @RequiredArgsConstructor
// @RequestMapping("/published-books")
// public class PublishedbookController {
//     private final PublishedBookService publishedBookService;
    
//     @GetMapping("/list/{user}")
//     public List<BookDto> getMethodName(@PathVariable("user") int userId)
//     {
//         return publishedBookService.PublishedBookList(userId);
//     }
    
// }
package org.example.final1.controller.mypage;

import java.util.List;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.example.final1.model.BookDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.JwtService;
import org.example.final1.service.PublishedBookService;
import org.example.final1.service.UserService;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/publishedbook")
public class PublishedBookController {

    private final PublishedBookService publishedbookService;
    private final UserService userService;
    private final JwtService jwtService;

    @GetMapping("/user-id")
    public int sendUserId(HttpServletRequest request) {
        return jwtService.getUserFromJwt(request).getUserId();
    }

    // 특정 사용자가 작성한 책들 가져오기
    @GetMapping("/user-books")
    public ResponseEntity<List<BookDto>> getUserBooks(@RequestParam("userId") int userId) {
        UserDto user = userService.getUserById(userId);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<BookDto> books = publishedbookService.getBooksByUser(user);
        return ResponseEntity.ok(books);
    }
}
