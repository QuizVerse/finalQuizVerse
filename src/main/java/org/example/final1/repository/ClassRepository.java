package org.example.final1.repository;

import org.example.final1.model.ClassDto;
import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepository extends JpaRepository<ClassDto,Long> {
    List<ClassDto> findAllByUser(UserDto user);
}
