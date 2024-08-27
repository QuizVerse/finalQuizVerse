package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.example.final1.model.CategoryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface BookRepository extends JpaRepository<BookDto, Integer>{
    List<BookDto> findByCategory(CategoryDto category);
}
