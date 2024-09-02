package org.example.final1.repository;

import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<UserDto, Integer> {
}
