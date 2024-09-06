package org.example.final1.repository;

import org.apache.catalina.User;
import org.example.final1.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WrongbookRepository extends JpaRepository<WrongDto, Integer> {

    Optional<WrongDto> findByUserAndSolvedbookAndQuestion(UserDto user, SolvedbookDto solvedbook, QuestionDto question);
}
