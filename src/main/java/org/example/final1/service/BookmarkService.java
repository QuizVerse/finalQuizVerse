package org.example.final1.service;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.model.BookmarkDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.BookmarkRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final BookRepository bookRepository;
    private final JwtService jwtService;

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

    // bookid별 저장 수 가져오기
    public int getBookmarkCountByBookId(int bookId) {
        return bookmarkRepository.countByBookId(bookId);
    }

    // 특정 사용자가 즐겨찾기한 문제집 총 개수 가져오기
    public int getBookmarkCountByUser(UserDto user) {
        return bookmarkRepository.countBookmarkByUserId(user.getUserId());
    }

    /**
     * 특정 사용자가 특정 책을 북마크했는지 여부를 확인
     * @param userId 사용자 ID
     * @param bookId 책 ID
     * @return 북마크 여부
     */
    public boolean isBookmarked(int userId, int bookId) {
        // 사용자 ID와 책 ID로 북마크를 검색
        return bookmarkRepository.existsByUserUserIdAndBookBookId(userId, bookId);
    }

}