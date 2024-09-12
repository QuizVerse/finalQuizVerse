package org.example.final1.controller.book;


import lombok.RequiredArgsConstructor;
import org.example.final1.model.CategoryDto;
import org.example.final1.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/new")

    public ResponseEntity<List<CategoryDto>> newCategory(@RequestBody List<CategoryDto> categoryDto) {
        List<CategoryDto> saved = categoryService.saveCategories(categoryDto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/list")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> list = categoryService.findAllCategory();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<CategoryDto>> getName(@PathVariable("id") int id) {
        Optional<CategoryDto> category = categoryService.getCategory(id);
        return ResponseEntity.ok(category);
    }


}