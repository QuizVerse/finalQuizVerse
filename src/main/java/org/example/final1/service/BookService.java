package org.example.final1.service;

import java.util.List;

import org.example.final1.model.BookDto;
import org.example.final1.model.CategoryDto;
import org.example.final1.repository.BookRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public List<BookDto> getAllBookByCategories(CategoryDto dto) {
        return bookRepository.findByCategory(dto);
    }
}
