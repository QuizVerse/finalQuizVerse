package org.example.final1.service;

import org.example.final1.model.CategoryDto;
import org.example.final1.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDto> saveCategories(List<CategoryDto> category) {
        return categoryRepository.saveAll(category);
    }

    public List<CategoryDto> findAllCategory() {
        return categoryRepository.findAll();
    }

    public Optional<CategoryDto> getCategory (int id) {
        return categoryRepository.findById(id);
    }


}