package org.example.final1.controller.book;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.model.ClassDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.ClassRepository;
import org.example.final1.service.BookService;
import org.example.final1.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.example.final1.storage.NcpObjectStorageService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/book")
public class NewController {

    private final BookService bookService;
    private final JwtService jwtService;

    private final NcpObjectStorageService ncpObjectStorageService;
    private final ClassRepository classRepository;
    private String bucketName="bitcamp701-129";
    private String folderName="final/book";

    /**
     * 새로운 책을 생성하고 사진을 업로드하는 엔드포인트
     *
     * @param bookDto 생성할 책의 정보가 담긴 DTO
     * @param upload 업로드할 사진 파일
     * @param request HTTP 요청 객체로, JWT 토큰이 포함되어야 함
     * @return 생성된 책의 정보와 사진 URL과 함께 HTTP 200 응답 반환
     */
    @PostMapping("/newbook")
    public ResponseEntity<Map<String, Object>> newBook(
            @ModelAttribute BookDto bookDto,
            @RequestParam("classId") Integer classId,
            @RequestParam("upload") MultipartFile upload,
            HttpServletRequest request) {

        // JWT 토큰에서 사용자 정보 가져오기
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto == null) {
            return ResponseEntity.status(401).build(); // 유효하지 않은 JWT 토큰 처리
        }

        // 사진 업로드 처리
        String bookPhoto = ncpObjectStorageService.uploadFile(bucketName, folderName, upload);

        // 업로드된 사진의 URL을 book_image 필드에 설정
        bookDto.setBookImage(bookPhoto);
        // 클래스 설정
        ClassDto classDto = classRepository.findById(classId).orElse(null);
        if (classDto != null) {
            bookDto.setClass1(classDto); // 클래스 객체를 BookDto에 설정
        }


        // 책 정보를 사용자 정보와 결합하여 설정
        bookDto.setUser(userDto);
        BookDto savedBook = bookService.saveBook(bookDto);

        // 결과 반환
        Map<String, Object> response = new HashMap<>();
        response.put("book", savedBook);
        response.put("photoUrl", bookPhoto);
        return ResponseEntity.ok(response);
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
    @GetMapping("/user/classes")
    public ResponseEntity<List<ClassDto>> getUserClasses(HttpServletRequest request) {

        UserDto userDto=jwtService.getUserFromJwt(request);
        if (userDto != null) {
            List<ClassDto> classes = classRepository.findAllByUser(userDto);
            return ResponseEntity.ok(classes);
        }
        else
        {
            //***********************************************************
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


}
