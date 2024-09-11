package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SectionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<QuestionDto,Integer> {
    List<QuestionDto> findBySectionSectionIdOrderByQuestionOrderAsc(int sectionId);

    List<QuestionDto> findAllByBookBookId(int bookId);  // 새로운 메서드 추가

    // 문제 개수 count
    @Query("SELECT COUNT(q) FROM QuestionDto q WHERE q.book.bookId =:bookId")
    int countQuestionByBookId(@Param("bookId") int bookId);
    @Query("SELECT COUNT(q) FROM QuestionDto q WHERE q.book.bookId = :bookId")
    int countByBookBookId(@Param("bookId") int bookId);

    // 여러 questionId에 해당하는 문제들의 배점을 가져오는 쿼리
    @Query("SELECT q.questionPoint FROM QuestionDto q WHERE q.questionId IN :questionIds")
    List<Integer> findQuestionPointsByIds(@Param("questionIds") List<Integer> questionIds);

    // 문제 ID 리스트로 문제들 조회
    @Query("SELECT q FROM QuestionDto q WHERE q.questionId IN :questionIds")
    List<QuestionDto> findQuestionsByIds(@Param("questionIds") List<Integer> questionIds);


}
