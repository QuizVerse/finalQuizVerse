package org.example.final1.repository;

import org.example.final1.model.AnswerDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<AnswerDto, Integer> {
}