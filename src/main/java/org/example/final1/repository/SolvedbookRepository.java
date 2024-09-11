package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.example.final1.model.BookWrongInfoDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SolvedbookRepository extends JpaRepository<SolvedbookDto, Integer> {

    // 사용자 ID가 응시한 문제집 총 개수 가져오기
    @Query("select count(c) from SolvedbookDto c where c.user.userId=:userId")
    int countSolvedBookByUserId(@Param("userId")int userId);

    // 사용자 ID와 bookId를 기반으로 현재 진행 중인 시험(SolvedbookDto) 찾기
    @Query("select c from SolvedbookDto c where c.user.userId=:userId and c.book.bookId=:bookId")
    Optional<SolvedbookDto> findByUserIdAndBookId(@Param("userId") int userId, @Param("bookId") int bookId);
    // 사용자와 bookId로 이미 풀었던 기록을 찾는 쿼리
    SolvedbookDto findByUserAndBook(UserDto userDto, BookDto bookDto);

    List<SolvedbookDto> findByUserUserId(int userId);

    Optional<SolvedbookDto> findBySolvedbookId(Integer solvedbookId);


    // solvedbookId로 SolvedBook을 조회
    Optional<SolvedbookDto> findBySolvedbookId(int solvedbookId);

    @Query("SELECT new org.example.final1.model.BookWrongInfoDto(" +
            "b.bookId, b.bookImage, b.bookTitle, u.userNickname, b.bookCreatedate, COUNT(w)) " +
            "FROM SolvedbookDto s " +
            "JOIN s.book b " +
            "JOIN b.user u " +
            "LEFT JOIN WrongDto w ON w.solvedbook = s " +
            "GROUP BY b.bookId, b.bookImage, b.bookTitle, u.userNickname, b.bookCreatedate")
    List<BookWrongInfoDto> findBookWrongInfo();


}
