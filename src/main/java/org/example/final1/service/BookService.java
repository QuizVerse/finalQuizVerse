package org.example.final1.service;

import org.example.final1.model.BookDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private final CategoryRepository categoryRepository;

    public List<BookDto> getBooksByCategory(Integer categoryId) {
        // 카테고리 ID에 해당하는 책 목록을 가져옵니다.
        List<BookDto> books = bookRepository.findByCategoryCategoryId(categoryId);
        return books;
    }

    public BookService(BookRepository bookRepository, CategoryRepository categoryRepository) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
    }

    public BookDto createBook(BookDto newbook) {
        return bookRepository.save(newbook);
    }

    public Optional<BookDto> getBookById(int id) {
        return bookRepository.findById(id);
    }

    public List<BookDto> searchBooks(String keyword) {
        return bookRepository.searchByTitleOrDescription(keyword);
    }
}

