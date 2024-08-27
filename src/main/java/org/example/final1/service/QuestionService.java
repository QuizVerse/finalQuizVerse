package org.example.final1.service;

import org.example.final1.model.BookDto;
import org.example.final1.model.ChoiceDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.repository.ChoiceRepository;
import org.example.final1.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final ChoiceRepository choiceRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository, ChoiceRepository choiceRepository ) {
        this.questionRepository = questionRepository;
        this.choiceRepository = choiceRepository;
    }

    public QuestionDto saveQuestion(QuestionDto newQuestion) {
        return questionRepository.save(newQuestion);
    }

<<<<<<< HEAD
    public void deleteQuestion(Integer id) {
=======
    public void deleteQuestion(int id) {
>>>>>>> 6cc1452ff4f3655b9427488bd100458f3dc0876c
        questionRepository.deleteById(id);
    }

    public List<QuestionDto> saveQuestions(List<QuestionDto> sortedQuestion) {
        return questionRepository.saveAll(sortedQuestion);
    }

    public List<QuestionDto> getAllQuestions(BookDto book) {
        return questionRepository.findAllByBook(book);
    }

    public void updateQuestionRes(int questionId) {
        // questionId로 QuestionDto 가져오기
        QuestionDto question = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid question ID"));

        // QuestionDto에 연관된 ChoiceDto 리스트 가져오기
        List<ChoiceDto> choices = choiceRepository.findByQuestion(question);

        // questionRes 필드에 설정
        question.setQuestionRes(choices);

        // 업데이트된 QuestionDto 저장
        questionRepository.save(question);
    }
}
