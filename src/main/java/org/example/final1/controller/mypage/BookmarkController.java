package org.example.final1.controller.mypage;
//
//import java.util.List;
//
//import jakarta.servlet.http.HttpServletRequest;
//import org.example.final1.model.BookDto;
//import org.example.final1.model.UserDto;
//import org.example.final1.service.BookmarkService;
import jakarta.servlet.http.HttpServletRequest;
import org.example.final1.model.UserDto;
import org.example.final1.service.JwtService;
import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import lombok.RequiredArgsConstructor;
//
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/bookmark")
//public class BookmarkController {
//
//    private final BookmarkService bookmarkService;
//    private final JwtService jwtService;
//
//    // bookmark가 있으면 삭제, 없으면 추가
////    @PostMapping("/toggle")
////    public void toggleBookmark(@RequestParam("user") UserDto user,
////                               @RequestParam("book") BookDto book) {
////
////        bookmarkService.toggleBookmark(user, book);
////    }
//    // bookmark가 있으면 삭제, 없으면 추가
//    @PostMapping("/toggle")
//    public ResponseEntity<Void> toggleBookmark(@RequestBody BookDto book, HttpServletRequest request) {
//        UserDto userDto = jwtService.getUserFromJwt(request);
//        if (userDto == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//
//        bookmarkService.toggleBookmark(userDto.getUserId(), book);
//        return ResponseEntity.ok().build();
//    }
//
//    // user의 모든 북마크 가져오기
////    @GetMapping("/list")
////    public List<BookDto> getUserBookmarks(@RequestParam("user") UserDto user) {
////        return bookmarkService.getUserBookmarks(user);
////    }
//
//    // user의 모든 북마크 가져오기
//    @GetMapping("/list")
//    public ResponseEntity<List<BookDto>> getUserBookmarks(HttpServletRequest request) {
//        UserDto userDto = jwtService.getUserFromJwt(request);
//        if (userDto == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//
//        List<BookDto> bookmarks = bookmarkService.getUserBookmarks(userDto.getUserId());
//        return ResponseEntity.ok(bookmarks);
//    }
//}
//package org.example.final1.controller.mypage;

import java.util.List;

import org.example.final1.model.BookDto;
import org.example.final1.service.BookmarkService;
import org.example.final1.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/bookmark")
public class BookmarkController {

    private final BookmarkService bookmarkService;
    private final JwtService jwtService;

    public BookmarkController(BookmarkService bookmarkService, JwtService jwtService) {
        this.bookmarkService = bookmarkService;
        this.jwtService = jwtService;
    }

    // bookmark가 있으면 삭제, 없으면 추가
    @PostMapping("/toggle")
    public ResponseEntity<Void> toggleBookmark(@RequestBody BookDto book, HttpServletRequest request) {
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        bookmarkService.toggleBookmark(userDto.getUserId(), book);  // userId 사용
        return ResponseEntity.ok().build();
    }

    // user의 모든 북마크 가져오기
    @GetMapping("/list")
    public ResponseEntity<List<BookDto>> getUserBookmarks(HttpServletRequest request) {
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<BookDto> bookmarks = bookmarkService.getUserBookmarks(userDto.getUserId());  // userId 사용
        return ResponseEntity.ok(bookmarks);
    }
}
