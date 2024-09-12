package org.example.final1.service;

import org.example.final1.model.BookDto;
import org.example.final1.model.BookResponseDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private final CategoryRepository categoryRepository;
    @Autowired
    private BookmarkService bookmarkService;
    @Autowired
    private SectionService sectionService;
    @Autowired
    private QuestionService questionService;

    public List<BookDto> getBooksByCategory(Integer categoryId) {
        // 카테고리 ID에 해당하는 책 목록을 가져옵니다.
        List<BookDto> books = bookRepository.findByCategoryCategoryId(categoryId);
        return books;
    }

    // 북마크 수가 큰 상위 5개 책을 가져오는 메소드
    public List<BookDto> getTop5BooksByBookmarkCount(Integer categoryId) {
        List<Object[]> results = bookRepository.findTop5ByCategoryIdOrderByBookmarkCountDesc(categoryId);

        return results.stream()
                .map(result -> (BookDto) result[0])  // 첫 번째 요소는 BookDto
                .collect(Collectors.toList());
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

    // 책 검색
    public List<BookResponseDto> searchBooks(String keyword){
        // 책 검색 로직
        List<BookDto> books = bookRepository.searchByTitleOrDescription(keyword);

        // BookResponseDto로 변환
        return books.stream().map(book -> {
            boolean isBookmark = false;
            int bookmarkCount = bookmarkService.getBookmarkCountByBookId(book.getBookId());
            int sectionCount = sectionService.getSectionCountByBookId(book.getBookId());
            int questionCount = questionService.getQuestionCountByBookId(book.getBookId());

            // UserDto에서 닉네임 가져오기
            String userNickname = book.getUser() != null ? book.getUser().getUserNickname() : "Unknown";
            String categoryName = book.getCategory() != null ? book.getCategory().getCategoryName() : "Unknown";

            return BookResponseDto.builder()
                    .bookId(book.getBookId())
                    .bookImage(book.getBookImage())
                    .bookTitle(book.getBookTitle())
                    .bookDescription(book.getBookDescription())
                    .bookStatus(book.getBookStatus())
                    .bookTimer(book.getBookTimer())
                    .bookIspublished(book.isBookIspublished())
                    .isBookmark(isBookmark)
                    .bookmarkCount(bookmarkCount)
                    .bookSectionCount(sectionCount)
                    .bookQuestionCount(questionCount)
                    .userNickname(userNickname)  // userNickname 추가
                    .categoryName(categoryName)  // userNickname 추가
                    .build();
        }).collect(Collectors.toList());
    }

    public BookDto getBookByBookId(int id) {
        return bookRepository.findByBookId(id);
    }

    public void deleteBook(int id) {
        bookRepository.deleteById(id);
    }

}

