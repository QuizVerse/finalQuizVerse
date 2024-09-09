package org.example.final1.service;

import lombok.AllArgsConstructor;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.model.UserDto;
import org.example.final1.model.WrongDto;
import org.example.final1.repository.WrongRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@AllArgsConstructor
@Service
public class WrongService {
    private final WrongRepository wrongRepository;


    //1. 해당 solvedbook과 userid를 wrongdto에서 찾아서 만약 dto가 없으면 0을 반환하고, 있으면 하나만 꺼내서 wrong_repeat을 반환해준다.

    public int getWrongRepeat(SolvedbookDto solvedbook,UserDto user){

        List<WrongDto> wrongDtoList = wrongRepository.findBySolvedbookAndUser(solvedbook, user);

        // 리스트가 비어있으면 0을 반환
        if (wrongDtoList.isEmpty()) {
            return 0;
        }
        // 첫 번째 WrongDto의 wrongRepeat 값 반환
        return wrongDtoList.get(0).getWrongRepeat();
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


}
