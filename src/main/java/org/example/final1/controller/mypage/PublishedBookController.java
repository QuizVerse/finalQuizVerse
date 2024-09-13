package org.example.final1.controller.mypage;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import jakarta.servlet.http.HttpServletRequest;

import org.example.final1.model.BookDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.BookService;
import org.example.final1.service.JwtService;
import org.example.final1.service.PublishedBookService;
import org.example.final1.service.UserService;
import org.example.final1.storage.NcpObjectStorageService;
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
    private final BookService bookService;
    private final NcpObjectStorageService storageService;

    private String bucketName="bitcamp701-129";
    private String folderName="final/book";

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
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBook(
            @PathVariable("id") int id,
            @RequestBody UserDto user) {

        // 문제집을 ID로 조회
        Optional<BookDto> bookOptional = bookService.getBookById(id);

        // 문제집이 존재하지 않으면 404 응답 반환
        if (!bookOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        BookDto book = bookOptional.get();

        // 문제집 소유자가 삭제 요청한 사용자와 일치하는지 확인 (null 안전성 확보)
        if (!Objects.equals(book.getUser().getUserId(), user.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403 Forbidden 반환
        }

        // 문제집을 삭제하는 대신 정보 수정
        book.setUser(null);  // 유저 정보 삭제
        book.setBookIspublished(false);  // bookIspublished를 false로 설정
        book.setBookStatus((short) 2);  // bookStatus를 2로 설정

        // 문제집 정보 업데이트
        bookService.saveBook(book);

        return ResponseEntity.noContent().build(); // 성공적으로 업데이트하면 204 반환
    }

    // 문제집 복제
    @PostMapping("/copy/{id}")
    public ResponseEntity<BookDto> copyBook(
            @PathVariable("id") int id,
            @RequestBody UserDto user) {

        // 문제집을 ID로 조회
        Optional<BookDto> bookOptional = bookService.getBookById(id);

        // 문제집이 존재하지 않으면 404 응답 반환
        if (!bookOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        BookDto originalBook = bookOptional.get();

        // 문제집 소유자가 복제 요청한 사용자와 일치하는지 확인 (null 안전성 확보)
        if (!Objects.equals(originalBook.getUser().getUserId(), user.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403 Forbidden 반환
        }

        // 문제집 복사본 생성
        BookDto copiedBook = new BookDto();
        copiedBook.setBookTitle(originalBook.getBookTitle() + " (복제본)");
        copiedBook.setBookDescription(originalBook.getBookDescription());
        copiedBook.setBookImage(originalBook.getBookImage());
        copiedBook.setUser(user); // 복사한 사용자에게 소유권 설정

        // 복제된 문제집 저장
        BookDto savedCopiedBook = bookService.saveBook(copiedBook);

        // 복제된 문제집 반환
        return ResponseEntity.ok(savedCopiedBook);
    }



}
