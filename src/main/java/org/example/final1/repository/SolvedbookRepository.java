package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SolvedbookRepository extends JpaRepository<SolvedbookDto, Integer> {

    // 사용자 ID가 응시한 문제집 총 개수 가져오기
    @Query("select count(c) from SolvedbookDto c where c.user.userId=:userId")
    int countSolvedBookByUserId(@Param("userId")int userId);

    // 사용자와 bookId로 이미 풀었던 기록을 찾는 쿼리
    SolvedbookDto findByUserAndBook(UserDto userDto, BookDto bookDto);
}
