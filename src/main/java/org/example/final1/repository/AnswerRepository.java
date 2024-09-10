package org.example.final1.repository;

import org.example.final1.model.AnswerDto;
import org.example.final1.model.QuestionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import java.util.List;

public interface AnswerRepository extends JpaRepository<AnswerDto, Integer> {

    @Query("SELECT a.question FROM AnswerDto a WHERE a.answerCorrect=false ")
    List<QuestionDto> findQuestionByAnswerCorrect();

    @Query("SELECT COUNT(a) FROM AnswerDto a WHERE a.solvedbook.solvedbookId = :solvedId AND a.wrongRepeat = :wrongRepeat AND a.answerCorrect = true")
    long countBySolvedbookSolvedIdAndWrongRepeat(@Param("solvedId") int solvedId, @Param("wrongRepeat") int wrongRepeat);
}