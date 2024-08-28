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

@Service
public class ChoiceService {
    private final ChoiceRepository choiceRepository;

    @Autowired
    public ChoiceService(ChoiceRepository choiceRepository ) {
        this.choiceRepository = choiceRepository;
    }

    public List<ChoiceDto> saveChoices(List<ChoiceDto> choices) {
        return choiceRepository.saveAll(choices);
    }

    public List<ChoiceDto> getAllChoices(int questionId) {
        return choiceRepository.findByQuestionQuestionId(questionId);
    }

}
