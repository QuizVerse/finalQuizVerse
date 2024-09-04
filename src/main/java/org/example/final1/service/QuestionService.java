package org.example.final1.service;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public List<QuestionDto> getQuestionsByBookId(int bookId) {
        return questionRepository.findAllByBookBookId(bookId);
    }
}
