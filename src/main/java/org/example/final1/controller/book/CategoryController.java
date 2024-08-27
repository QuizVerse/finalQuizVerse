package org.example.final1.controller.book;


import com.amazonaws.Response;
import lombok.RequiredArgsConstructor;
import org.example.final1.model.CategoryDto;
import org.example.final1.model.ClassDto;
import org.example.final1.service.CagtegoryService;
import org.example.final1.service.NewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/category")
public class CategoryController {

    private final CagtegoryService cagtegoryService;

    @PostMapping("/new")
    public ResponseEntity<CategoryDto> newCategory(@RequestBody CategoryDto categoryDto) {
        CategoryDto saved = cagtegoryService.saveCategory(categoryDto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/list")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> list = cagtegoryService.findAllCategory();
        return ResponseEntity.ok(list);
    }

}