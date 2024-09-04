package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SectionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SectionRepository extends JpaRepository<SectionDto, Integer> {

    public List<SectionDto> findAllByBookBookId(int bookId);
    // 섹션 개수 count
    @Query("SELECT COUNT(s) FROM SectionDto s WHERE s.book.bookId =:bookId")
    int countSectionsByBookId(@Param("bookId") int bookId);
}
