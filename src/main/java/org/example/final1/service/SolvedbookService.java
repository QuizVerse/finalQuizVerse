package org.example.final1.service;


import org.example.final1.model.BookDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.SolvedbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

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

        // 시험 응시 기록 생성 및 저장 (SolvedBook)
        SolvedbookDto solvedBook = SolvedbookDto.builder()
                .book(book)
                .user(userDto)
                .solvedbookStart(new Timestamp(System.currentTimeMillis())) // 시험 시작 시간
                .build();

        // 저장
        SolvedbookDto savedSolvedBook = solvedBookRepository.save(solvedBook);
        return savedSolvedBook; // 저장된 solvedBook 반환
    }

    // 사용자 ID가 응시한 문제집 총 개수 가져오기
    public int getSolvedBookCountByUser(UserDto user){
        return solvedBookRepository.countSolvedBookByUserId(user.getUserId());
    }

    // 시간만 저장하는 로직
    public void saveRemainingTime(UserDto userDto, int bookId, int timeLeft) {
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
    }



    // 사용자가 해당 문제집을 이미 풀었는지 확인하는 메서드
    public SolvedbookDto findSolvedBookByUserAndBook(UserDto userDto, BookDto bookDto) {
        // SolvedbookRepository를 사용하여 해당 사용자와 책의 기록을 찾아 반환
        return solvedBookRepository.findByUserAndBook(userDto, bookDto);
    }
}
