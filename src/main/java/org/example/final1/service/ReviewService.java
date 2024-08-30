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

    public List<ReviewDto> getReviewsByBookId(int bookId) {
        return reviewRepository.findByBookId_BookId(bookId);
    }

}
