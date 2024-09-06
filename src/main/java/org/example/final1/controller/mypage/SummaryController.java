package org.example.final1.controller.mypage;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.final1.model.UserDto;
import org.example.final1.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/summary")
public class SummaryController {

    private final UserService userService;
    private final ClassmemberService classmemberService;
    private final PublishedBookService publishedbookService;
    private final SolvedbookService solvedbookService;
    private final BookmarkService bookmarkService;
    private final JwtService jwtService;


    // userid가 속한 클래스 개수 가져오기
    @GetMapping("/user-class/count")
    public ResponseEntity<Integer> getUserClassCount(@RequestParam("userId") int userId) {
        UserDto user = userService.getUserById(userId);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        int userClassCount = classmemberService.getClassCount(user);
        return ResponseEntity.ok(userClassCount);
    }
    // 특정 사용자가 출제한 문제집 총 개수 가져오기
    @GetMapping("/user-books/count")
    public ResponseEntity<Integer> getUserBooksCount(@RequestParam("userId") int userId) {
        UserDto user = userService.getUserById(userId);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        int publishedCount = publishedbookService.getBooksCountByUser(user);
        return ResponseEntity.ok(publishedCount);
    }

    // 특정 사용자가 응시한 문제집 총 개수 가져오기
    @GetMapping("/user-solvedbooks/count")
    public ResponseEntity<Integer> getSolvedBookCount(@RequestParam("userId") int userId){
        UserDto user = userService.getUserById(userId);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        int solvedCount = solvedbookService.getSolvedBookCountByUser(user);
        return ResponseEntity.ok(solvedCount);
    }

    // 특정 사용자가 즐겨찾기한 문제집 총 개수 가져오기
    @GetMapping("/user-bookmarks/count")
    public ResponseEntity<Integer> getBookmarkedCount(@RequestParam("userId") int userId) {
        UserDto user = userService.getUserById(userId);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        int bookmarkCount = bookmarkService.getBookmarkCountByUser(user);
        return ResponseEntity.ok(bookmarkCount);
    }

    // 로그인한 사용자의 닉네임을 가져오는 엔드포인트
    @GetMapping("/nickname")
    public ResponseEntity<String> getUserNickname(HttpServletRequest request) {
        UserDto user = jwtService.getUserFromJwt(request);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String nickname = userService.getUserNicknameById(user.getUserId());
        if (nickname == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(nickname);
    }
}
