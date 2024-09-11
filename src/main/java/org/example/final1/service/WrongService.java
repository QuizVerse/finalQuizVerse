package org.example.final1.service;

import lombok.AllArgsConstructor;
import org.example.final1.model.*;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.SolvedbookRepository;
import org.example.final1.repository.WrongRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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


    public List<WrongDto> getWrongBooksByUserId(Integer userId) {
        // 사용자 ID로 오답 목록을 조회
        List<WrongDto> wrongEntities = wrongRepository.findByUserUserId(userId);

        // 결과를 담을 리스트
        List<WrongDto> wrongDtoList = new ArrayList<>();

        // 각 오답 엔티티에 대해 처리
        for (WrongDto wrongEntity : wrongEntities) {
            // solvedbookId로 bookId를 조회
            Integer bookId = solvedbookRepository.findBookIdBySolvedbookId(wrongEntity.getSolvedbook().getSolvedbookId());


            BookDto bookDto=bookRepository.findByBookId(bookId);
            String bookTitle=bookDto.getBookTitle();

            wrongEntity.setBookTitle(bookTitle);


            // WrongDto 객체에 bookId 설정
            wrongEntity.setBookId(bookId); // 필요한 경우 bookId 필드를 추가하고 설정

            // 리스트에 추가
            wrongDtoList.add(wrongEntity);
        }

        return wrongDtoList;
    }

    // 특정 유저 ID에 대한 책 정보 및 틀린 문항 수 조회
    public List<BookWrongInfoDto> getBookWrongInfoByUserId(int userId) {
        return solvedbookRepository.findBookWrongInfoByUserId(userId);
    }

}
