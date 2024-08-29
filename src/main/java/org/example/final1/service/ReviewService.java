package org.example.final1.service;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.ReviewDto;
import org.example.final1.repository.ReviewRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public boolean saveReview(ReviewDto reviewDto) {
        try {
            // Review 엔티티를 데이터베이스에 저장
            reviewRepository.save(reviewDto);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
