package org.example.final1.repository;

import org.example.final1.model.ChoiceDto;
import org.example.final1.model.QuestionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ChoiceRepository extends JpaRepository<ChoiceDto,Integer> {
    List<ChoiceDto> findByQuestionQuestionId(int questionId);
}
