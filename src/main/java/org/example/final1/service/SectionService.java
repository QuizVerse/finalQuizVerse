package org.example.final1.service;

import org.example.final1.model.BookDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SectionDto;
import org.example.final1.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

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

    public List<SectionDto> saveSections(List<SectionDto> sortedSection) {
        return sectionRepository.saveAll(sortedSection);
    }

    public void deleteSection(Integer id) {
        sectionRepository.deleteById(id);
    }

    public List<SectionDto> getAllSectionsByBook(BookDto book) {
        return sectionRepository.findAllByBook(book);
    }

    // bookId에 해당하는 질문을 section_number 오름차순으로 불러오기
    public List<SectionDto> getAllSections(int bookId) {
        return sectionRepository.findAllByBookBookIdOrderBySectionNumberAsc(bookId);
    }

    // 섹션 아이디로 섹션 하나의 정보 받아오기
    public Optional<SectionDto> getSection(int id) {
        return sectionRepository.findById(id);
    }

    // 섹션 개수 count
    public int getSectionCountByBookId(int bookId) {
        return sectionRepository.countSectionsByBookId(bookId);
    }
}
