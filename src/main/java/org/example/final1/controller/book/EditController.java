package org.example.final1.controller.book;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.model.ChoiceDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SectionDto;
import org.example.final1.service.ChoiceService;
import org.example.final1.service.QuestionService;
import org.example.final1.service.SectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class EditController {

    private final SectionService sectionService;
    private final QuestionService questionService;
    private final ChoiceService choiceService;

    /** 섹션 관련 */
    // 섹션 생성
    @PostMapping("/section/new")
    public ResponseEntity<SectionDto> insertSection(@RequestBody SectionDto dto) {
        SectionDto saved = sectionService.saveSection(dto);
        return ResponseEntity.ok(saved);
    }

    // 섹션 리스트 저장
    @PostMapping("/section/saveall")
    public ResponseEntity<List<SectionDto>> saveSections(@RequestBody List<SectionDto> sectionList) {
        List<SectionDto> list = sectionService.saveSections(sectionList);
        return ResponseEntity.ok(list);
    }

    // 섹션 삭제
    @DeleteMapping("/section/delete/{id}")
    public ResponseEntity<Void> deleteSection(@PathVariable("id") Long id) {
        sectionService.deleteSection(id);
        return ResponseEntity.noContent().build();
    }

    // 섹션 모두 불러오기
    @PostMapping("/section/getall")
    public ResponseEntity<List<SectionDto>> getAllSections(@RequestBody BookDto book) {
        List<SectionDto> list = sectionService.getAllSections(book);
        return ResponseEntity.ok(list);
    }

    /** 질문 관련 */
    // 질문 생성
    @PostMapping("/question/new")
    public ResponseEntity<QuestionDto> insertQuestion(@RequestBody QuestionDto dto) {
        QuestionDto saved = questionService.saveQuestion(dto);
        return ResponseEntity.ok(saved);
    }

    // 질문 삭제
    @DeleteMapping("/question/delete/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable("id") int id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }

    // 질문 리스트 저장
    @PostMapping("/question/saveall")
    public ResponseEntity<List<QuestionDto>> saveQuestions(@RequestBody List<QuestionDto> questionList) {
        List<QuestionDto> list = questionService.saveQuestions(questionList);
        return ResponseEntity.ok(list);
    }

    // 질문 모두 불러오기
    @PostMapping("/question/getall")
    public ResponseEntity<List<QuestionDto>> getAllQuestions(@RequestBody BookDto book) {
        List<QuestionDto> list = questionService.getAllQuestions(book);
        return ResponseEntity.ok(list);
    }

    // Choices 저장
    @PostMapping("/choice/saveall")
    public ResponseEntity<List<ChoiceDto>> saveChoices(@RequestBody List<ChoiceDto> choices) {
        List<ChoiceDto> list = choiceService.saveChoices(choices);
        return ResponseEntity.ok(list);
    }

    // ChoiceDto 조회
    @PutMapping("/question/{id}/update-res")
    public void updateQuestionRes(@PathVariable int id) {
        questionService.updateQuestionRes(id);
    }

}
