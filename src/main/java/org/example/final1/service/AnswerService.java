package org.example.final1.service;


import org.example.final1.model.AnswerDto;
import org.example.final1.model.ChoiceDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.repository.AnswerRepository;
import org.example.final1.repository.ChoiceRepository;
import org.example.final1.repository.QuestionRepository;
import org.example.final1.repository.SolvedbookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private ChoiceRepository choiceRepository;
    @Autowired
    private SolvedbookRepository solvedbookRepository;

    public void saveAnswers(List<AnswerDto> answers) {
        for (AnswerDto answerDto : answers) {
            AnswerDto answer = new AnswerDto();

            // Question 매핑
            QuestionDto question = questionRepository.findById(answerDto.getQuestion().getQuestionId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid question ID"));
            answer.setQuestion(question);

            // Choice (객관식 문제) 매핑
            if (answerDto.getChoice() != null) {
                ChoiceDto choice = choiceRepository.findById(answerDto.getChoice().getChoiceId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid choice ID"));
                answer.setChoice(choice);
            }

            // 주관식 답안
            if (answerDto.getSubjectiveAnswer() != null) {
                answer.setSubjectiveAnswer(answerDto.getSubjectiveAnswer());
            }

            // Solvedbook 매핑
            if (answerDto.getSolvedbook() != null) {
                SolvedbookDto solvedbook = solvedbookRepository
                        .findById(answerDto.getSolvedbook().getSolvedbookId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid solvedbook ID"));
                answer.setSolvedbook(solvedbook);
            }

            // 정답 여부 및 기타 정보 설정
            answer.setAnswerOrder(answerDto.getAnswerOrder());
            answer.setAnswerCorrect(false); // 정답 여부는 별도의 로직에서 처리 가능

            // 답안 저장
            answerRepository.save(answer);
        }
    }

}
