package org.example.final1.controller.book;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.example.final1.model.*;
import org.example.final1.repository.WrongRepository;
import org.example.final1.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    @Autowired
    private WrongRepository wrongbookRepository;
    @Autowired
    private WrongService wrongService;


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
    public ResponseEntity<Map<String, Object>> startTest(@RequestBody Map<String, Integer> requestBody, HttpServletRequest request) {
        Integer bookId = requestBody.get("bookId");

        // JWT에서 사용자 정보 추출
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        try {
            // 이미 존재하는 solvedBook을 찾거나 없으면 새로운 solvedBook 생성
            SolvedbookDto solvedBook = solvedbookService.startTest(bookId, userDto); // 해당 메서드가 알아서 생성 여부를 처리
            System.out.println("Solvedbook 컨트롤러: " + solvedBook);

            int wrongRepeat = wrongService.getWrongRepeat(solvedBook, userDto); // wrongrepeat 값 반환
            System.out.println("wrongRepeat 컨트롤러: " + wrongRepeat);

            // 응답 데이터 생성
            Map<String, Object> response = new HashMap<>();
            response.put("solvedbookId", solvedBook.getSolvedbookId()); // solvedbookId를 명시적으로 추가
            response.put("solvedBook", solvedBook);
            response.put("wrongRepeat", wrongRepeat);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // 사용자가 제출한 답안을 저장하는 API 엔드포인트

    // 답안을 저장하는 엔드포인트

    @PostMapping("/save/answers")
    public ResponseEntity<String> saveAnswers(@RequestBody List<AnswerDto> answers, @RequestParam("wrongRepeat") int wrongRepeat, HttpServletRequest request) {
        try {
            answerService.saveAnswers(answers,wrongRepeat,request);

            System.out.println("Wrong Repeat: " + wrongRepeat);


            return ResponseEntity.ok("답안이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            System.err.println("Error saving answers: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("답안 저장 중 오류가 발생했습니다.");
        }
    }

    // 시간만 저장하는 임시 저장 엔드포인트 수정
    @PostMapping("/save/temporary")
    public ResponseEntity<String> saveTime(@RequestBody Map<String, Integer> requestBody, HttpServletRequest request) {
        try {
            Integer timeLeft = requestBody.get("timeLeft");
            Integer bookId = requestBody.get("bookId");

            // JWT에서 사용자 정보 추출 (사용자 검증)
            UserDto userDto = jwtService.getUserFromJwt(request);
            if (userDto == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            // 시간 저장 서비스 호출
           // solvedbookService.saveRemainingTime(userDto, bookId, timeLeft);
            return ResponseEntity.ok("남은 시간이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            System.err.println("Error saving time: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("시간 저장 중 오류가 발생했습니다.");
        }
    }
    // 오답 문제를 필터링하여 반환하는 API
    // SolvedbookId와 wrongRepeat로 오답 문제들을 조회하는 API
    @GetMapping("/test/wrong")
    public ResponseEntity<List<QuestionDto>> getWrongQuestions(@RequestParam("solvedbookId") int solvedbookId, @RequestParam("wrongRepeat") int wrongRepeat) {
        List<QuestionDto> wrongQuestions = wrongService.getWrongQuestions(solvedbookId, wrongRepeat);
        System.out.println("Wrong Repeat: " + wrongRepeat);


        return ResponseEntity.ok(wrongQuestions);

    }

}
