package org.example.final1.service;

import org.example.final1.model.BookDto;
import org.example.final1.model.CategoryDto;
import org.example.final1.repository.CategoryRepository;
import org.example.final1.repository.NewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CagtegoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CagtegoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryDto saveCategory(CategoryDto category) {
        return categoryRepository.save(category);
    }

    public List<CategoryDto> findAllCategory() {
        return categoryRepository.findAll();
    }


}