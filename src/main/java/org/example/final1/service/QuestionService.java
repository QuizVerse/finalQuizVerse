package org.example.final1.service;

import org.example.final1.model.BookDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public QuestionDto saveQuestion(QuestionDto newQuestion) {
        return questionRepository.save(newQuestion);
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    public List<QuestionDto> saveQuestions(List<QuestionDto> sortedQuestion) {
        return questionRepository.saveAll(sortedQuestion);
    }

    public List<QuestionDto> getAllQuestions(BookDto book) {
        return questionRepository.findAllByBook(book);
    }
}
