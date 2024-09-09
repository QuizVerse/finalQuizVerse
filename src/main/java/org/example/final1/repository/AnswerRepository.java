package org.example.final1.repository;

import org.example.final1.model.AnswerDto;
import org.example.final1.model.QuestionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import java.util.List;

public interface AnswerRepository extends JpaRepository<AnswerDto, Integer> {

    List<AnswerDto> findAllByQuestionQuestionIdIn(List<Integer> questionIds);

    @Query("SELECT a.question FROM AnswerDto a WHERE a.answerCorrect=false ")
    List<QuestionDto> findQuestionByAnswerCorrect();
}