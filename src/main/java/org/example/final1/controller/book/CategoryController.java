package org.example.final1.controller.book;


import lombok.RequiredArgsConstructor;

import org.example.final1.model.BookDto;
import org.example.final1.model.CategoryDto;
import org.example.final1.service.BookService;
import org.example.final1.service.CagtegoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/category")
public class CategoryController {

    private final CagtegoryService cagtegoryService;
    private final BookService bookService;

    @PostMapping("/new")
    public ResponseEntity<CategoryDto> newCategory(@RequestBody CategoryDto categoryDto) {
        CategoryDto saved = cagtegoryService.saveCategory(categoryDto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/list")
    public List<BookDto> getAllBookByCategories(
        @RequestParam("category") String category
    ) {
        CategoryDto dto = cagtegoryService.getCategory(category);

        List<BookDto> list = bookService.getAllBookByCategories(dto);
        return list;
    }

}
