package org.example.final1.service;

import org.example.final1.model.*;
import org.example.final1.repository.WrongbookRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WrongService {
    private final WrongbookRepository wrongbookRepository;
    public WrongService(WrongbookRepository wrongbookRepository) {
        this.wrongbookRepository = wrongbookRepository;
    }

    public void Wronganswer(UserDto user, SolvedbookDto solvedbook, QuestionDto question){

        Optional<WrongDto> existingWrong=wrongbookRepository.findByUserAndSolvedbookAndQuestion(user,solvedbook,question);

        if(existingWrong.isPresent()){
            //해당 문제집의 대한 오답노트가 이미 있으면 wrong repeat이 1 증가한다.
            WrongDto wrongDto=existingWrong.get();
            wrongDto.setWrongRepeat(wrongDto.getWrongRepeat()+1);

            wrongbookRepository.save(wrongDto);


        }else{
            //처음 오답이 생기는 로직임
            WrongDto wrongDto= WrongDto.builder()
                    .user(solvedbook.getUser())
                    .solvedbook(solvedbook)
                    .question(question)
                    .wrongRepeat(1)
                    .build();

            wrongbookRepository.save(wrongDto);
        }

    }
}
