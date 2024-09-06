package org.example.final1.repository;

import org.example.final1.model.ClassDto;
import org.example.final1.model.ClassmemberDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ClassmemberRepository extends JpaRepository<ClassmemberDto, Integer> {
    Optional<List<ClassmemberDto>> findByClass1_ClassId(Integer classId);

    @Query("SELECT c.class1.classId from ClassmemberDto c Where c.user.userId=:userId")
    List<Integer> findClassIdsByUserId(@Param("userId") Integer userId);

    Optional<ClassmemberDto>findByClass1_ClassIdAndUser_UserId(Integer classId, Integer userId);

    @Query("select count(book) from BookDto book where book.user.userId = :userId")
    int countUserClassById(@Param("userId")int userId);
}
