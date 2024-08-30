package org.example.final1.repository;

import org.example.final1.model.ClassDto;
import org.example.final1.model.ClassmemberDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClassmemberRepository extends JpaRepository<ClassmemberDto, Integer> {
    Optional<List<ClassmemberDto>> findByClass1_ClassId(Integer classId);
}
