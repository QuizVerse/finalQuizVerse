package org.example.final1.service;

import org.example.final1.model.SectionDto;
import org.example.final1.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SectionService {
    private final SectionRepository sectionRepository;

    @Autowired
    public SectionService(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    public SectionDto saveSection(SectionDto newSection) {
        return sectionRepository.save(newSection);
    }

    public void deleteSection(Long id) {
        sectionRepository.deleteById(id);
    }
}
