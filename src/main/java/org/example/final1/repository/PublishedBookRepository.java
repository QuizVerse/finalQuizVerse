package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PublishedBookRepository extends JpaRepository<BookDto, Integer> {
    
    //  // 특정 사용자가 작성한 모든 책 목록을 가져오는 쿼리 메서드
    // @Query("SELECT b FROM BookDto b WHERE b.user.id = :userId")
    List<BookDto> findAllByUser(UserDto user);

    @Query("SELECT COUNT(b) FROM BookDto b WHERE b.user.userId = :userId ")
    int countPublishedBooksByUserId(@Param("userId") int userId);
}
