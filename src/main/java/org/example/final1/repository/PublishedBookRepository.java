package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PublishedBookRepository extends JpaRepository<BookDto, Integer> {


    List<BookDto> findByUserUserId(Integer userId);

}
