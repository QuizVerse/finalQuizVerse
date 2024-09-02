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

    // 책을 저장하거나 업데이트하는 메소드
    public BookDto saveBook(BookDto bookDto) {
        // bookDto를 데이터베이스에 저장
        return bookRepository.save(bookDto);
    }

    public Optional<BookDto> getBookById(int id) {
        return bookRepository.findById(id);
    }

    public List<BookDto> searchBooks(String keyword) {
        return bookRepository.searchByTitleOrDescription(keyword);
    }
    public BookDto getBookByBookId(int id) {
        return bookRepository.findByBookId(id);
    }

}

