package org.example.final1.repository;

import java.util.List;

import org.example.final1.model.ReviewDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewDto, Integer> {

    // bookid로 해당 문제집의 리뷰 불러오기
    List<ReviewDto> findByBookId_BookId(int bookId);

}
