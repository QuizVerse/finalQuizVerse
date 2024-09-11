
package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.example.final1.model.BookmarkDto;
import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<BookmarkDto, Integer> {
    Optional<BookmarkDto> findByUserAndBook(UserDto user, BookDto book);
    List<BookmarkDto> findAllByUser(UserDto user);
    BookmarkDto findByBookmarkId(int id);
    @Query("SELECT COUNT(b) FROM BookmarkDto b WHERE b.book.bookId = :bookId")
    int countByBookId(@Param("bookId") int bookId);

    // 특정 사용자가 즐겨찾기한 문제집 총 개수 가져오기
    @Query("select count(bm) from BookmarkDto bm where bm.user.userId=:userId")
    int countBookmarkByUserId(@Param("userId")int userId);

    boolean existsByUserUserIdAndBookBookId(int userId, int bookId);
}
