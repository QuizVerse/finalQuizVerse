package org.example.final1.repository;

import org.example.final1.model.QuestionDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreRepository extends JpaRepository<QuestionDto, Integer> {
}
