package org.example.final1.repository;

import org.example.final1.model.AnswerDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<AnswerDto, Integer> {

    List<AnswerDto> findAllByQuestionQuestionIdIn(List<Integer> questionIds);
}