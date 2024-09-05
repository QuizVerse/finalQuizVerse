package org.example.final1.controller.book;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.catalina.User;
import org.example.final1.model.*;
import org.example.final1.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    @Autowired
    private AnswerService answerService;

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

    // 사용자가 제출한 답안을 저장하는 API 엔드포인트

    // 답안을 저장하는 엔드포인트
    @PostMapping("/save/answers")
    public ResponseEntity<String> saveAnswers(@RequestBody List<AnswerDto> answers) {
        System.out.println("Received answers: " + answers.toString());  // 로그로 데이터 확인
        try {
            answerService.saveAnswers(answers); // 답안 저장 서비스 호출
            return ResponseEntity.ok("답안이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            System.err.println("Error saving answers: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("답안 저장 중 오류가 발생했습니다.");
        }
    }





}
