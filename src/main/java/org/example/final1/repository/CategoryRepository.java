package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.example.final1.model.CategoryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryDto,Long> {

}