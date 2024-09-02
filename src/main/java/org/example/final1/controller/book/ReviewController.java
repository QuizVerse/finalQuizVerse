package org.example.final1.controller.book;


import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;

import org.example.final1.model.ReviewDto;
import org.example.final1.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/book")
public class ReviewController {

    private final ReviewService reviewService;

    // 새로운 리뷰 추가
    @PostMapping("/review")
    public ResponseEntity<ReviewDto> addReview(@RequestBody ReviewDto reviewDto) {
        ReviewDto savedReview = reviewService.saveReview(reviewDto);
        return ResponseEntity.ok(savedReview);
    }

}