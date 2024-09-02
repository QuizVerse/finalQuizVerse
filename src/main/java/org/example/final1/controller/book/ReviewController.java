package org.example.final1.controller.book;


import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;

import org.apache.catalina.User;
import org.example.final1.model.BookDto;
import org.example.final1.model.ReviewDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.BookService;
import org.example.final1.service.JwtService;
import org.example.final1.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/book")
public class ReviewController {

    private final ReviewService reviewService;
    private final BookService bookService;
    private final JwtService jwtService;

    // 새로운 리뷰 추가
    @PostMapping("/review/save")
    public ResponseEntity<Void> insertReview(@RequestBody ReviewDto reviewDto, HttpServletRequest request) {
        UserDto userDto = jwtService.getUserFromJwt(request);
        if(userDto == null) {
            return ResponseEntity.status(401).build();
        }
        BookDto bookDto = bookService.getBookByBookId(reviewDto.getBookId().getBookId());
        if(bookDto == null) {
            return ResponseEntity.status(401).build();
        }

        reviewDto.setUser(userDto);
        reviewDto.setBookId(bookDto);

        reviewService.saveReview(reviewDto);

        return ResponseEntity.ok().build();
    }

}