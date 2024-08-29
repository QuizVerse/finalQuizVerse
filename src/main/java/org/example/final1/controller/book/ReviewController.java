package org.example.final1.controller.book;

import org.example.final1.model.ReviewDto;
import org.example.final1.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/book/review")
public class ReviewController {

    private final ReviewService reviewService;

    // 리뷰를 저장하는 엔드포인트
    @PostMapping("/{id}")
    public ResponseEntity<String> createReview(@RequestBody ReviewDto reviewDto) {
        boolean isSaved = reviewService.saveReview(reviewDto);
        if (isSaved) {
            return ResponseEntity.ok("Review saved successfully");
        } else {
            return ResponseEntity.status(500).body("Failed to save review");
        }
    }
}
