package org.example.final1.repository;

import java.util.List;

import org.example.final1.model.ReviewDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewDto, Integer> {

    List<ReviewDto> findByBookId_BookId(int bookId);

}
