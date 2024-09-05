package org.example.final1.service;


import org.example.final1.model.BookDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.SolvedbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

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



}
