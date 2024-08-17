package org.example.final1.repository;

import org.example.final1.model.ClassDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository extends JpaRepository<ClassDto,Long> {
}
