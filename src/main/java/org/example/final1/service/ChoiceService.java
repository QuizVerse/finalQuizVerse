package org.example.final1.service;

import org.example.final1.model.BookDto;
import org.example.final1.model.ChoiceDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SectionDto;
import org.example.final1.repository.ChoiceRepository;
import org.example.final1.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChoiceService {
    private final ChoiceRepository choiceRepository;

    @Autowired
    public ChoiceService(ChoiceRepository choiceRepository ) {
        this.choiceRepository = choiceRepository;
    }

    public ChoiceDto saveChoice(ChoiceDto choice) {
        return choiceRepository.save(choice);
    }

    public List<ChoiceDto> saveChoices(List<ChoiceDto> choices) {
        return choiceRepository.saveAll(choices);
    }

    public List<ChoiceDto> getAllChoices(int questionId) {
        return choiceRepository.findByQuestionQuestionId(questionId);
    }

    public void deleteChoice(Integer id) {
        choiceRepository.deleteById(id);
    }

    // 답안 아이디로 답안 하나의 정보 받아오기
    public Optional<ChoiceDto> getChoice(int id) {
        return choiceRepository.findById(id);
    }

}
