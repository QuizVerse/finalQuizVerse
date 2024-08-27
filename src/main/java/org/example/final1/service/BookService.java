package org.example.final1.service;

import java.util.List;

import org.example.final1.model.BookDto;
import org.example.final1.model.CategoryDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;

    public BookService(BookRepository bookRepository, CategoryRepository categoryRepository) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<BookDto> getBooksByCategory(Integer categoryId) {
        // 카테고리가 존재하는지 확인
        CategoryDto category = categoryRepository.findById(categoryId).orElse(null);
        if (category == null) {
            throw new IllegalArgumentException("Invalid category ID");
        }

        // 카테고리에 속하는 책들을 조회
        return bookRepository.findByCategory(category);
    }
}
