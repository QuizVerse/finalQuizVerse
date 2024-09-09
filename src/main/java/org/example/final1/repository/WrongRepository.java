package org.example.final1.repository;

import org.example.final1.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WrongRepository extends JpaRepository<WrongDto, Integer> {

    List<WrongDto> findBySolvedbookAndUser(SolvedbookDto solvedbook, UserDto user );

    // SolvedbookId와 wrongRepeat로 오답을 조회하는 메서드
    @Query("SELECT w FROM WrongDto w WHERE w.solvedbook.solvedbookId = :solvedbookId AND w.wrongRepeat >= :wrongRepeat")
    List<WrongDto> findBySolvedbookIdandWrongrepeat(@Param("solvedbookId") int solvedbookId, @Param("wrongRepeat") int wrongRepeat);

}
