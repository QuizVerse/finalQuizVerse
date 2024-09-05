package org.example.final1.controller.mypage;

import java.util.List;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;
import org.example.final1.model.BookDto;
import org.example.final1.model.BookmarkDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.BookmarkService;
import org.example.final1.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmark")
public class BookmarkController {

    private final BookmarkService bookmarkService;
    private final JwtService jwtService;


    // 북마크 추가/삭제 토글
    @PostMapping("/toggle")
    public ResponseEntity<Void> toggleBookmark(@RequestBody Map<String, Integer> requestBody, HttpServletRequest request) {
        UserDto user = jwtService.getUserFromJwt(request);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        int bookId = requestBody.get("bookId");
        bookmarkService.toggleBookmark(user, bookId);
        return ResponseEntity.ok().build();
    }


    // 특정 사용자의 북마크된 책들 가져오기
    @GetMapping("/user-bookmarks")
    public ResponseEntity<List<BookDto>> getUserBookmarks(HttpServletRequest request) {
        UserDto user = jwtService.getUserFromJwt(request);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<BookDto> bookmarks = bookmarkService.getUserBookmarks(user);
        return ResponseEntity.ok(bookmarks);
    }


    // 로그인한 사용자 정보 가져오기
    @GetMapping("/userid")
    public ResponseEntity<UserDto> getUserInfo(HttpServletRequest request) {
        UserDto userDto = jwtService.getUserFromJwt(request);
        if(userDto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/info/{id}")
    public ResponseEntity<BookmarkDto> getAllInfo(@RequestParam("id") int id) {
        BookmarkDto bookmarkDto = bookmarkService.getBookmarkById(id);
        if(bookmarkDto == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(bookmarkDto);

        }
    }

    // 북마크된 책 개수 가져오기
    @GetMapping("/countBookmarks/{bookId}")
    public ResponseEntity<Integer> getBookmarkCount(@PathVariable("bookId") int bookId) {
        try {
            int bookmarkCount = bookmarkService.getBookmarkCountByBookId(bookId);
            return ResponseEntity.ok(bookmarkCount);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
    }
}
