package org.example.final1.repository;

import org.example.final1.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WrongRepository extends JpaRepository<WrongDto, Integer> {

    List<WrongDto> findBySolvedbookAndUser(SolvedbookDto solvedbook, UserDto user);


}
