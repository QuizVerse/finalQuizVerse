
package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<BookDto, Integer> {
    List<BookDto> findByCategoryCategoryId(Integer categoryId);

    // 제목과 설명에서 검색어를 찾는 쿼리
    @Query("SELECT b FROM BookDto b WHERE LOWER(b.bookTitle) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(b.bookDescription) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<BookDto> searchByTitleOrDescription(@Param("keyword") String keyword);

    BookDto findByBookId(int bookId);

    List<BookDto> findByClass1ClassId(int classId);

    // 북마크 수가 많은 상위 5개의 책을 가져오는 쿼리
    @Query("SELECT b, COUNT(bm.book) AS bookmarkCount " +
            "FROM BookDto b LEFT JOIN BookmarkDto bm ON b.bookId = bm.book.bookId " +
            "WHERE b.category.categoryId = :categoryId " +
            "GROUP BY b.bookId " +
            "ORDER BY bookmarkCount DESC")
    List<Object[]> findTop5ByCategoryIdOrderByBookmarkCountDesc(@Param("categoryId") Integer categoryId);

}
