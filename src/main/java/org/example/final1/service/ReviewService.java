package org.example.final1.service;

import java.util.List;
import java.util.Optional;

import lombok.NonNull;
import org.example.final1.model.ReviewDto;
import org.example.final1.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {

    @NonNull
    private ReviewRepository reviewRepository;

    // bookid로 해당 문제집의 리뷰 불러오기
    public List<ReviewDto> getReviewsByBookId(int bookId) {
        return reviewRepository.findByBookId_BookId(bookId);
    }

    // 리뷰 저장
    public ReviewDto saveReview(ReviewDto reviewDto) {
        return reviewRepository.save(reviewDto);
    }
}
