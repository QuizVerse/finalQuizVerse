package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SectionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<QuestionDto,Integer> {
    List<QuestionDto> findAllBySectionSectionId(int sectionId);

    List<QuestionDto> findAllByBookBookId(int bookId);  // 새로운 메서드 추가

}
