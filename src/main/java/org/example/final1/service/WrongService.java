package org.example.final1.service;

import lombok.AllArgsConstructor;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.model.UserDto;
import org.example.final1.model.WrongDto;
import org.example.final1.repository.WrongRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
public class WrongService {
    private final WrongRepository wrongRepository;


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
        // 특정 사용자 ID로 오답 데이터를 가져옵니다.
        return wrongRepository.findAllByUser_UserId(userId);
    }






}
