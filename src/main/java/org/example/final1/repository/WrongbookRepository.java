package org.example.final1.repository;

import org.example.final1.model.QuestionDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.model.UserDto;
import org.example.final1.model.WrongDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WrongbookRepository extends JpaRepository<WrongDto, Integer> {

    Optional<WrongDto> findByUserAndSolvedbookAndQuestion(UserDto user, SolvedbookDto solvedbook, QuestionDto question);
}
