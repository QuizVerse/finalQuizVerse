package org.example.final1.controller.book;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.BookService;
import org.example.final1.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/book")
@SuppressWarnings("java:S1220")
public class NewController {

    private final BookService bookService;
    private final JwtService jwtService;

    /**
     * 새로운 책을 생성하는 엔드포인트
     *
     * @param bookDto 생성할 책의 정보가 담긴 DTO
     * @return 생성된 책의 정보와 함께 HTTP 200 응답 반환
     */

    @PostMapping("/newbook") // service에서 작성한 것들을 여기서 매핑해서 사용
    public ResponseEntity<BookDto> newBook(@RequestBody BookDto bookDto) {
        BookDto savedbook = bookService.createBook(bookDto);
        return ResponseEntity.ok(savedbook);
    }

    /**
     * 현재 로그인한 사용자의 정보를 반환하는 엔드포인트
     *
     * @param request HTTP 요청 객체로, JWT 토큰이 포함되어야 함
     * @return UserDto 객체, JWT가 유효하지 않으면 예외를 발생시킴
     */
    @GetMapping("/user/info")
    public ResponseEntity<UserDto> getUserInfo(HttpServletRequest request) {
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto != null) {
            return ResponseEntity.ok(userDto);
        } else {
            throw new RuntimeException("Invalid or missing JWT token");
        }
    }

}
