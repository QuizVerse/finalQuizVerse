package org.example.final1.repository;

import org.example.final1.model.QuestionDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface QuestionRepository extends JpaRepository<QuestionDto,Long> {
}
