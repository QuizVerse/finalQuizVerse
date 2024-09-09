package org.example.final1.service;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.model.ChoiceDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SectionDto;
import org.example.final1.repository.ChoiceRepository;
import org.example.final1.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionDto saveQuestion(QuestionDto newQuestion) {
        return questionRepository.save(newQuestion);
    }


    public void deleteQuestion(int id) {
        questionRepository.deleteById(id);
    }

    public List<QuestionDto> saveQuestions(List<QuestionDto> sortedQuestion) {
        return questionRepository.saveAll(sortedQuestion);
    }

    // 질문 하나의 정보 받아오기
    public Optional<QuestionDto> getQuestion(int questionId) {
        return questionRepository.findById(questionId);
    }

    public List<QuestionDto> getAllQuestions(int sectionId) {
        return questionRepository.findAllBySectionSectionId(sectionId);
    }

    public void updateQuestionRes(int questionId) {
        // questionId로 QuestionDto 가져오기
        QuestionDto question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid question ID"));

        // 업데이트된 QuestionDto 저장
        questionRepository.save(question);
    }

    // 특정 책 ID에 대한 모든 질문 가져오기
    public List<QuestionDto> getQuestionsByBookId(int id) {
        return questionRepository.findAllByBookBookId(id);
    }
    // 문제 개수 count
    public int getQuestionCountByBookId(int bookId) {
        return questionRepository.countQuestionByBookId(bookId);
    }

    // 주어진 질문 리스트의 배점을 업데이트하는 메서드
    public void updateQuestionPoints(List<QuestionDto> questions) {
        for (QuestionDto question : questions) {
            // 각 questionId를 사용해 기존 질문을 조회
            QuestionDto existingQuestion = questionRepository.findById(question.getQuestionId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid question ID: " + question.getQuestionId()));

            // 기존 질문의 배점(questionPoint)을 새로운 값으로 업데이트
            existingQuestion.setQuestionPoint(question.getQuestionPoint());

            // 업데이트된 질문을 데이터베이스에 저장
            questionRepository.save(existingQuestion);
        }
    }

    // bookId에 해당하는 Question 질문 뽑아내고 list 만들어
    public List<Integer> getQuestionIdsByBookId(int bookId) {
        List<QuestionDto> questions = questionRepository.findAllByBookBookId(bookId);
        return questions.stream()
                .map(QuestionDto::getQuestionId)
                .collect(Collectors.toList());
    }

}
