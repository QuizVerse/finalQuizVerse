package org.example.final1.service;

import org.example.final1.model.BookDto;
import org.example.final1.model.BookResponseDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.CategoryRepository;
import org.example.final1.storage.NcpObjectStorageService;
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
    @Autowired
    private NcpObjectStorageService ncpObjectStorageService; // 파일 삭제를 위한 서비스

    private String bucketName = "bitcamp701-129";
    private String folderName = "final/book";


    public List<BookDto> getBooksByCategory(Integer categoryId) {
        // 카테고리 ID에 해당하는 책 목록을 가져옵니다.
        List<BookDto> books = bookRepository.findByCategoryCategoryIdAndBookIspublishedTrueAndBookStatus(categoryId, (short) 0);
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
        // 기존 책 정보 조회
        Optional<BookDto> existingBookOpt = bookRepository.findById(bookDto.getBookId());
        if (existingBookOpt.isPresent()) {
            BookDto existingBook = existingBookOpt.get();

            // 기존 사진 URL 처리
            if (bookDto.getBookImage() != null && !bookDto.getBookImage().equals(existingBook.getBookImage())) {
                // 기존 사진 URL이 있고 새로운 사진으로 교체된 경우, 기존 사진 삭제
                if (existingBook.getBookImage() != null && !existingBook.getBookImage().isEmpty()) {
                    ncpObjectStorageService.deleteFile(bucketName, folderName, existingBook.getBookImage());
                }
            }
        }

        // 책 정보 저장
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

    // 문제집 삭제 메서드 (진짜 삭제함)
    public void deleteBook(int id) {
        bookRepository.deleteById(id);
    }

    // BookDto를 BookResponseDto로 변환하는 메서드, 추가적인 개수 정보를 포함
    public BookResponseDto convertToBookResponseDto(BookDto bookDto) {
        // 각 개수 정보를 서비스에서 불러오기
        int bookmarkCount = bookmarkService.getBookmarkCountByBookId(bookDto.getBookId());
        int questionCount = questionService.getQuestionCountByBookId(bookDto.getBookId());
        int sectionCount = sectionService.getSectionCountByBookId(bookDto.getBookId());

        return BookResponseDto.builder()
                .bookId(bookDto.getBookId())
                .bookImage(bookDto.getBookImage())
                .bookTitle(bookDto.getBookTitle())
                .bookDescription(bookDto.getBookDescription())
                .bookStatus(bookDto.getBookStatus())
                .bookTimer(bookDto.getBookTimer())
                .bookCreatedate(bookDto.getBookCreatedate())
                .bookIspublished(bookDto.isBookIspublished())
                .bookTotalscore(bookDto.getBookTotalscore())
                .user(bookDto.getUser())  // UserDto 변환
                .category(bookDto.getCategory())  // CategoryDto 변환
                .class1(bookDto.getClass1())  // ClassDto 변환
                .isBookmark(false)  // 임의의 북마크 여부
                .bookmarkCount(bookmarkCount)  // 실제 북마크 개수
                .bookSectionCount(sectionCount)  // 실제 섹션 개수
                .bookQuestionCount(questionCount)  // 실제 질문 개수
                .build();
    }


}

