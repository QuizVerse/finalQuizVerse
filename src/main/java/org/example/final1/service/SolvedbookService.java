package org.example.final1.service;


import org.example.final1.model.BookDto;
import org.example.final1.model.SolvedBookInfoDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.SolvedbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SolvedbookService {

    @Autowired
    private SolvedbookRepository solvedBookRepository;

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private SolvedbookRepository solvedbookRepository;

    public SolvedbookDto startTest(Integer bookId, UserDto userDto) {
        // 문제집 정보 가져오기
        BookDto book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book not found"));

        System.out.println(book);
        System.out.println(userDto);

        // 이미 존재하는 Solvedbook을 찾기
        SolvedbookDto existingSolvedBook = findSolvedBookByUserAndBook(userDto, book);

        if (existingSolvedBook != null) {
            // 이미 풀었던 문제집일 경우 기존 solvedBook 반환
            return existingSolvedBook;
        }

        // 기록이 없으면 새로 생성하여 저장
        SolvedbookDto solvedBook = SolvedbookDto.builder()
                .book(book)
                .user(userDto)
                .solvedbookStart(new Timestamp(System.currentTimeMillis())) // 시험 시작 시간
                .build();

        // 저장
        SolvedbookDto savedSolvedBook = solvedBookRepository.save(solvedBook);
        return savedSolvedBook; // 새로 저장된 solvedBook 반환
    }

    // 사용자 ID가 응시한 문제집 총 개수 가져오기
    public int getSolvedBookCountByUser(UserDto user){
        return solvedBookRepository.countSolvedBookByUserId(user.getUserId());
    }


    //문제집을 제출했으면 submiit true로하기
    public void setSubmitTrue(int solvedbookId) {
        // solvedbookId로 해당 Solvedbook을 조회
        SolvedbookDto solvedbook = solvedbookRepository.findById(solvedbookId)
                .orElseThrow(() -> new NoSuchElementException("해당 solvedbook을 찾을 수 없습니다."));

        // isSubmitted 값을 true로 설정
        solvedbook.setSolvedbookIssubmitted(true);

        // 업데이트 내용을 저장
        solvedbookRepository.save(solvedbook);
    }



    // 사용자가 해당 문제집을 이미 풀었는지 확인하는 메서드
    public SolvedbookDto findSolvedBookByUserAndBook(UserDto userDto, BookDto bookDto) {
        // SolvedbookRepository를 사용하여 해당 사용자와 책의 기록을 찾아 반환
        return solvedBookRepository.findByUserAndBook(userDto, bookDto);
    }


    public List<SolvedBookInfoDto> getSolvedBooksByUserId(int userId) {
        // 사용자의 다 푼 문제집 리스트 가져오기
        List<SolvedbookDto> solvedBooks = solvedBookRepository.findByUserUserId(userId);

        // SolvedBookInfoDto 리스트로 변환
        return solvedBooks.stream().map(solvedBook -> {
            BookDto book = solvedBook.getBook();

            // BookDto와 SolvedbookDto의 정보를 합쳐서 새로운 DTO로 변환
            return SolvedBookInfoDto.builder()
                    .bookId(book.getBookId())
                    .bookImage(book.getBookImage())
                    .bookTitle(book.getBookTitle())
                    .bookDescription(book.getBookDescription())
                    .bookStatus(book.getBookStatus())
                    .bookTimer(book.getBookTimer())
                    .bookCreatedate(book.getBookCreatedate())
                    .solvedbookId(solvedBook.getSolvedbookId())
                    .solvedbookIssubmitted(solvedBook.isSolvedbookIssubmitted())
                    .solvedbookStart(solvedBook.getSolvedbookStart())
                    .solvedbookEnd(solvedBook.getSolvedbookEnd())
                    .solvedbookTimer(solvedBook.getSolvedbookTimer())
                    .build();
        }).collect(Collectors.toList());
    }

    public SolvedbookDto getSolvedBookBysolvedbookId(Integer solvedbookId) {
        // Optional에서 SolvedbookDto 반환, 없으면 예외 처리
        return solvedBookRepository.findBySolvedbookId1(solvedbookId)
                .orElseThrow(() -> new IllegalArgumentException("Solvedbook not found with ID: " + solvedbookId));
    }


    public SolvedbookDto getSolvedBookById(Integer solvedbookId) {
        return solvedBookRepository.findBySolvedbookId(solvedbookId)
                .map(this::convertToDto)
                .orElse(null); // solvedbookId로 존재하는 solvedBook을 반환, 없으면 null
    }

    private SolvedbookDto convertToDto(SolvedbookDto solvedbook) {
        // 엔티티를 Dto로 변환하는 로직
        SolvedbookDto solvedbookDto = new SolvedbookDto();
        solvedbookDto.setSolvedbookId(solvedbook.getSolvedbookId());
        solvedbookDto.setSolvedbookId(solvedbook.getBook().getBookId());
        // 필요한 필드들 추가
        return solvedbookDto;
    }

    // solvedbookId로 SolvedBook을 찾아 BookId 반환
    public Optional<SolvedbookDto> getBookIdBySolvedbookId(int solvedbookId) {
        return solvedbookRepository.findBySolvedbookId(solvedbookId);
    }


    // Solvedbook을 업데이트하는 메서드
//    public void updateSolvedBook(SolvedbookDto solvedbook) {
//        solvedbookRepository.save(solvedbook); // DB에 업데이트
//    }

}
