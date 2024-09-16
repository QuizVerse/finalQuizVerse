package org.example.final1.service;

import lombok.AllArgsConstructor;
import org.example.final1.model.*;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.SolvedbookRepository;
import org.example.final1.repository.WrongRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
public class WrongService {
    private final WrongRepository wrongRepository;
    private final SolvedbookRepository solvedbookRepository;
    private final BookRepository bookRepository;

    //1. 해당 solvedbook과 userid를 wrongdto에서 찾아서 만약 dto가 없으면 0을 반환하고, 있으면 하나만 꺼내서 wrong_repeat을 반환해준다.

    public int getWrongRepeat(SolvedbookDto solvedbook, UserDto user) {

        List<WrongDto> wrongDtoList = wrongRepository.findBySolvedbookAndUser(solvedbook, user);

        System.out.println("wrongDtoList: " + wrongDtoList);

        // 리스트가 비어있으면 0을 반환
        if (wrongDtoList.isEmpty()) {
            return 0;
        }

        System.out.println("wrongDtoList: " + wrongDtoList.stream()
                .mapToInt(WrongDto::getWrongRepeat) // wrongRepeat 값을 가져옴
                .max() );

        // wrongRepeat 값 중 가장 큰 값을 반환
        return wrongDtoList.stream()
                .mapToInt(WrongDto::getWrongRepeat) // wrongRepeat 값을 가져옴
                .max() // 가장 큰 값을 찾음
                .orElse(0); // 만약 max 값이 없으면(리스트가 비어있으면) 0 반환
    }




    //2. 오답노트가 생길때 wrong dto에 저장을 해주는데, wrong_repeat은 1이 더해진값과 이제 틀린 문제들 (qeustion) solvedbook을 저장해주면 된다.

    public void saveWrongAnswer(UserDto user, SolvedbookDto solvedbook, QuestionDto question, int wrongRepeat){

        WrongDto newWrong = WrongDto.builder()
                .user(user)
                .solvedbook(solvedbook)
                .question(question)
                .wrongRepeat(wrongRepeat + 1)  // URL에서 받은 wrongRepeat에 1을 더함
                .build();

        // 새로운 오답 기록을 저장
        wrongRepository.save(newWrong);



    }



    // 특정 solvedbookId와 wrongRepeat에 해당하는 틀린 문제 조회
    public List<QuestionDto> getWrongQuestions(int solvedbookId, int wrongRepeat) {
        List<WrongDto> wrongAnswers = wrongRepository.findbySolvedbookandWrongrepeat(solvedbookId, wrongRepeat);

        System.out.println("Service: wrongAnswers: "+wrongAnswers);


        return wrongAnswers.stream()
                .map(WrongDto::getQuestion)
                .distinct()
                .collect(Collectors.toList());
    }



    // solvedbookId와 wrongRepeat 조합을 기준으로 그룹화된 오답 목록을 반환하는 메서드
    public List<WrongDto> getGroupedWrongBooksByUserId(Integer userId) {
        // 사용자의 모든 오답 데이터를 가져옴
        List<WrongDto> wrongDtoList = wrongRepository.findByUserUserId(userId);

        // 각 solvedbookId에 대해 bookId와 bookTitle을 가져와서 설정
        wrongDtoList.forEach(wrong -> {
            Integer bookId = wrong.getSolvedbook().getBook().getBookId(); // solvedbook에서 bookId를 가져옴
            String bookTitle = wrong.getSolvedbook().getBook().getBookTitle(); // solvedbook에서 bookTitle을 가져옴
            wrong.setBookId(bookId); // @Transient 필드에 bookId 저장
            wrong.setBookTitle(bookTitle); // @Transient 필드에 bookTitle 저장
        });

        // solvedbookId와 wrongRepeat 조합을 기준으로 중복되지 않게 그룹화하는 작업을 수행
        Map<String, WrongDto> groupedBooks = wrongDtoList.stream()
                .collect(Collectors.toMap(
                        wrong -> generateKey(wrong), // 각 오답(wrong)의 solvedbookId와 wrongRepeat 조합을 키로 사용
                        wrong -> wrong, // 오답 항목 자체를 값으로 사용
                        (existing, replacement) -> existing // 만약 중복된 키가 있을 경우, 기존 항목을 유지하고 새로운 항목은 무시
                ));

        // Map의 값들을 리스트로 변환하여 반환
        return groupedBooks.values().stream().collect(Collectors.toList());
    }

    // solvedbookId와 wrongRepeat 값을 조합하여 고유한 키를 생성하는 메서드
    // 예를 들어, solvedbookId가 1이고 wrongRepeat가 2일 경우 "1-2"라는 키를 생성
    private String generateKey(WrongDto wrong) {
        return wrong.getSolvedbook().getSolvedbookId() + "-" + wrong.getWrongRepeat();
    }

    // 특정 유저 ID에 대한 책 정보 및 틀린 문항 수 조회
    public List<BookWrongInfoDto> getBookWrongInfoByUserId(int userId) {
        return solvedbookRepository.findBookWrongInfoByUserId(userId);
    }

}
