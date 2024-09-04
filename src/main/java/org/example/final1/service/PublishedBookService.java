package org.example.final1.service;

import org.example.final1.model.BookDto;
import org.example.final1.repository.PublishedBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublishedBookService {

    private final PublishedBookRepository publishedBookRepository;

    @Autowired
    public PublishedBookService(PublishedBookRepository publishedBookRepository) {
        this.publishedBookRepository = publishedBookRepository;
    }

    // 사용자 ID로 책을 조회하는 메소드
    public List<BookDto> getBooksByUserId(int userId) {
        return publishedBookRepository.findByUserUserId(userId);
    }
}
