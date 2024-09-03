package org.example.final1.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.example.final1.model.BookDto;
import org.example.final1.model.BookmarkDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.BookmarkRepository;
import org.example.final1.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;


    @Transactional
    public void toggleBookmark(UserDto user, BookDto book) {
        // 유저와 책으로 북마크를 찾음
        var existingBookmark = bookmarkRepository.findByUserAndBook(user, book);

        if (existingBookmark.isPresent()) {
            // 북마크가 이미 존재한다면 제거
            bookmarkRepository.delete(existingBookmark.get());
        } else {
            // 북마크가 없다면 추가
            BookmarkDto newBookmark = BookmarkDto.builder()
                    .user(user)
                    .book(book)
                    .build();
            bookmarkRepository.save(newBookmark);
        }
    }

    @Transactional
    public List<BookDto> getUserBookmarks(UserDto user) {
        return bookmarkRepository.findAllByUser(user).stream().map(BookmarkDto::getBook).collect(Collectors.toList());
    }
}

