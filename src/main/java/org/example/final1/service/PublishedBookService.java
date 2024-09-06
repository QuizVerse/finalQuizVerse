package org.example.final1.service;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.PublishedBookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublishedBookService {

    private final PublishedBookRepository publishedbookRepository;
    private final BookRepository bookRepository;

    // 특정 사용자가 작성한 책들을 가져오는 메서드
    public List<BookDto> getBooksByUser(UserDto user) {
        return publishedbookRepository.findAllByUser(user);
    }
    // 사용자 ID로 출제한 문제집 총 개수 가져오기
    public int getBooksCountByUser(UserDto user) {
        return publishedbookRepository.countPublishedBooksByUserId(user.getUserId());
    }
}
