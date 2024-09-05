package org.example.final1.controller.book;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.catalina.User;
import org.example.final1.model.BookDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.BookService;
import org.example.final1.service.JwtService;
import org.example.final1.service.SolvedbookService;
import org.example.final1.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/book")
public class TestController {

    private final BookService bookService;
    @Autowired
    private TestService testService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private SolvedbookService solvedbookService;

    public TestController(BookService bookService) {
        this.bookService = bookService;
    }

    // 로그인한 사용자 정보 가져오기
    @GetMapping("/username")
    public ResponseEntity<UserDto> getUserInfo(HttpServletRequest request) {

        UserDto userDto = jwtService.getUserFromJwt(request);
        if(userDto == null) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.ok(userDto);
    }


    // 문제집 정보 불러오기
    @GetMapping("/test/{id}")
    public ResponseEntity<BookDto> getBookInfo(@PathVariable("id") int id) {
        BookDto bookDto = bookService.getBookByBookId(id);
        if(bookDto == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(bookDto);
        }
    }

    // 시험 시작 요청 처리
    @PostMapping("/test/start")
    public ResponseEntity<SolvedbookDto> startTest(@RequestBody Map<String, Integer> requestBody, HttpServletRequest request) {
        Integer bookId = requestBody.get("bookId");

        // JWT에서 사용자 정보 추출
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        // 시험 시작 관련 비즈니스 로직 처리
        try {
            SolvedbookDto solvedBook = solvedbookService.startTest(bookId, userDto); // 시험을 시작하고 solvedBook 반환
            return ResponseEntity.ok(solvedBook);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



}
