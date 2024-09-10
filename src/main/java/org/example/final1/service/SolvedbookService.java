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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SolvedbookService {

    @Autowired
    private SolvedbookRepository solvedBookRepository;

    @Autowired
    private BookRepository bookRepository;

    public SolvedbookDto startTest(Integer bookId, UserDto userDto) {
        // 문제집 정보 가져오기
        BookDto book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book not found"));

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

    // 시간만 저장하는 로직
  /*  public void saveRemainingTime(UserDto userDto, int bookId, int timeLeft) {
        // 사용자 정보(userDto)와 연관된 solvedbook 엔티티에서 남은 시간 저장
        Optional<SolvedbookDto> solvedBookOpt = solvedBookRepository.findByUserIdAndBookId(userDto.getUserId(), bookId);

        if (solvedBookOpt.isPresent()) {
            SolvedbookDto solvedbook = solvedBookOpt.get();

            // 남은 시간을 초 단위로 저장할 때
            solvedbook.setSolvedbookTimer(String.valueOf(timeLeft));  // 남은 시간을 solvedbookTimer에 저장
            solvedBookRepository.save(solvedbook);  // DB에 저장

            System.out.println("사용자 " + userDto.getUserNickname() + "의 남은 시간: " + timeLeft + "초 저장 완료");
        } else {
            // 만약 해당 사용자의 시험 기록이 없으면 예외 처리 혹은 새로운 레코드 생성 가능
            System.out.println("해당 사용자의 시험 기록을 찾을 수 없습니다.");
        }
    }*/



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
                    .solvedbookStart(solvedBook.getSolvedbookStart())
                    .solvedbookEnd(solvedBook.getSolvedbookEnd())
                    .solvedbookTimer(solvedBook.getSolvedbookTimer())
                    .build();
        }).collect(Collectors.toList());
    }
}
