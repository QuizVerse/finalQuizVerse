package org.example.final1.service;


import jakarta.servlet.http.HttpServletRequest;
import org.example.final1.model.*;
import org.example.final1.repository.*;
import org.example.final1.model.AnswerDto;
import org.example.final1.model.ChoiceDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Autowired
    private WrongService wrongService;

    @Autowired
    private JwtService jwtService;
    @Autowired
    private WrongRepository wrongRepository;




    public void saveAnswers(List<AnswerDto> answers, int wrongRepeat, HttpServletRequest request) {
        for (AnswerDto answerDto : answers) {
            AnswerDto answer = new AnswerDto();

            // Question 매핑
            QuestionDto question = questionRepository.findById(answerDto.getQuestion().getQuestionId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid question ID"));
            answer.setQuestion(question);

            // Solvedbook 매핑
            SolvedbookDto solvedbook = solvedbookRepository.findById(answerDto.getSolvedbook().getSolvedbookId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid solvedbook ID"));
            answer.setSolvedbook(solvedbook);

            UserDto user=jwtService.getUserFromJwt(request);

            // Choice (객관식 답안일 경우) 매핑
            if (answerDto.getChoices() != null && !answerDto.getChoices().isEmpty()) {
                List<ChoiceDto> choices = answerDto.getChoices().stream()
                        .map(choiceDto -> choiceRepository.findById(choiceDto.getChoiceId())
                                .orElseThrow(() -> new IllegalArgumentException("Invalid choice ID: " + choiceDto.getChoiceId())))
                        .collect(Collectors.toList());
                answer.setChoices(choices);

                // 객관식 문제의 경우, 선택한 답안이 정답인지 확인
                boolean isCorrect = checkMultipleChoiceCorrect(question, choices);
                answer.setAnswerCorrect(isCorrect);

                answer.setWrongRepeat(wrongRepeat);

                System.out.println(answer);

                if (!isCorrect) {
                    // 틀린 답안인 경우 오답 저장 로직 추가
                    wrongService.saveWrongAnswer(user, solvedbook, question, wrongRepeat);
                }

            }

            // 주관식 답안 처리
            if (answerDto.getSubjectiveAnswer() != null) {
                answer.setSubjectiveAnswer(answerDto.getSubjectiveAnswer());

                // 주관식 문제의 경우, 제출한 답안이 정답인지 확인
                boolean isCorrect = checkSubjectiveCorrect(question, answerDto.getSubjectiveAnswer());
                answer.setAnswerCorrect(isCorrect);
                answer.setWrongRepeat(wrongRepeat);


                System.out.println(wrongRepeat);

                if (!isCorrect) {
                    // 틀린 답안인 경우 오답 저장 로직 추가
                    wrongService.saveWrongAnswer(user, solvedbook, question, wrongRepeat);
                }

            }


            // 답안 순서 설정
            answer.setAnswerOrder(answerDto.getAnswerOrder());


            // 답안 저장
            answerRepository.save(answer);





        }
    }



    // 객관식 답안 채점 로직
    private boolean checkMultipleChoiceCorrect(QuestionDto question, List<ChoiceDto> selectedChoices) {
        // 선택한 문제의 모든 선택지 가져오기 (ChoiceRepository에서 questionId를 이용해 찾음)
        List<ChoiceDto> allChoices = choiceRepository.findByQuestionQuestionId(question.getQuestionId());

        // 정답인 선택지 필터링 (choiceIsanswer가 true인 선택지)
        List<ChoiceDto> correctChoices = allChoices.stream()
                .filter(ChoiceDto::getChoiceIsanswer) // choiceIsanswer 필드를 사용하여 정답 필터링
                .collect(Collectors.toList());

        // 선택한 답안과 정답 비교 (HashSet을 사용하여 선택한 답안과 정답이 일치하는지 확인)
        return new HashSet<>(selectedChoices).containsAll(correctChoices)
                && new HashSet<>(correctChoices).containsAll(selectedChoices);
    }

    // 주관식 답안 채점 로직
    // 주관식 답안 채점 로직
    private boolean checkSubjectiveCorrect(QuestionDto question, String subjectiveAnswer) {
        // 주관식 문제의 정답 가져오기
        String correctAnswer = choiceRepository.findByQuestionQuestionId(question.getQuestionId()).toString();

        // 대소문자 구분 없이 공백을 제거하고 비교
        return correctAnswer.trim().equalsIgnoreCase(subjectiveAnswer.trim());
    }

}

