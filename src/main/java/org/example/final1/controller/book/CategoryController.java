package org.example.final1.controller.book;


import lombok.RequiredArgsConstructor;
import org.example.final1.model.CategoryDto;
import org.example.final1.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/new")
    public ResponseEntity<CategoryDto> newCategory(@RequestBody CategoryDto categoryDto) {
        CategoryDto saved = categoryService.saveCategory(categoryDto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/list")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> list = categoryService.findAllCategory();
        return ResponseEntity.ok(list);
    }

}