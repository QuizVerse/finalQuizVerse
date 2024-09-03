package org.example.final1.service;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.model.BookmarkDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.BookmarkRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final BookRepository bookRepository;

    @Transactional
    public void toggleBookmark(UserDto user, int bookId) {
        BookDto book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
        var existingBookmark = bookmarkRepository.findByUserAndBook(user, book);

        if (existingBookmark.isPresent()) {
            bookmarkRepository.delete(existingBookmark.get());
        } else {
            BookmarkDto newBookmark = BookmarkDto.builder()
                    .user(user)
                    .book(book)
                    .build();
            bookmarkRepository.save(newBookmark);
        }
    }
    @Transactional
    public List<BookDto> getUserBookmarks(UserDto user) {
        return bookmarkRepository.findAllByUser(user)
                .stream()
                .map(BookmarkDto::getBook)
                .collect(Collectors.toList());
    }

    public BookmarkDto getBookmarkById(int id) {
        return bookmarkRepository.findByBookmarkId(id);
    }
}