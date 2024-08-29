package org.example.final1.repository;

import org.example.final1.model.ReviewDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewDto, Integer> {
    // 필요한 메서드를 정의합니다.
}
