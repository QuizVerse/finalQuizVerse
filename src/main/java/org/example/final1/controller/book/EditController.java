package org.example.final1.controller.book;

import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.model.ChoiceDto;
import org.example.final1.model.QuestionDto;
import org.example.final1.model.SectionDto;
import org.example.final1.service.BookService;
import org.example.final1.service.ChoiceService;
import org.example.final1.service.QuestionService;
import org.example.final1.service.SectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class EditController {

    private final SectionService sectionService;
    private final QuestionService questionService;
    private final ChoiceService choiceService;
    private final BookService bookService;


    /** 페이지 관련 */
    @GetMapping("/edit/{id}")
    public ResponseEntity<Map<String, Object>> getBookDetail(@PathVariable("id") int id) {
        Optional<BookDto> bookOpt = bookService.getBookById(id);
        if (bookOpt.isPresent()) {
            BookDto book = bookOpt.get();

            // Fetch sections, questions, and choices related to the book
//            List<SectionDto> sections = sectionService.getAllSections(book);
//            List<QuestionDto> questions = questionService.getAllQuestions(book);

            // Create the response map
            Map<String, Object> response = new HashMap<>();
            response.put("book", book);
//            response.put("sections", sections);
//            response.put("questions", questions);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // 섹션, 질문 모두 저장
    @PostMapping("/edit/saveall")
    public ResponseEntity<Map<String, Object>> saveSections(@RequestBody List<SectionDto> sectionList,  @RequestBody List<QuestionDto> questionList) {
        List<SectionDto> sections = sectionService.saveSections(sectionList);
        List<QuestionDto> questions = questionService.saveQuestions(questionList);

        Map<String, Object> response = new HashMap<>();
        response.put("sections", sections);
        response.put("questions", questions);

        return ResponseEntity.ok(response);
    }

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
    public ResponseEntity<Void> deleteSection(@PathVariable("id") Integer id) {
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

    // 섹션으로 질문 불러오기
    @PostMapping("/question/getallbysection")
    public ResponseEntity<List<QuestionDto>> getAllQuestionsBySection(@RequestBody SectionDto section) {
        List<QuestionDto> list = questionService.getAllQuestionsBySection(section);
        return ResponseEntity.ok(list);
    }

    // 질문 모두 불러오기
    @PostMapping("/question/getall")
    public ResponseEntity<List<QuestionDto>> getAllQuestions(@RequestBody BookDto book) {
        List<QuestionDto> list = questionService.getAllQuestions(book);
        return ResponseEntity.ok(list);
    }

    // Choice 저장
    @DeleteMapping("/choice/delete/{id}")
    public ResponseEntity<Void> deleteChoice(@PathVariable("id") Integer id) {
        choiceService.deleteChoice(id);
        return ResponseEntity.noContent().build();
    }

    // Choice 삭제
    @PostMapping("/choice/new")
    public ResponseEntity<ChoiceDto> saveChoices(@RequestBody ChoiceDto choice) {
        ChoiceDto saved = choiceService.saveChoice(choice);
        return ResponseEntity.ok(saved);
    }

    // Choices 저장
    @PostMapping("/choice/saveall")
    public ResponseEntity<List<ChoiceDto>> saveChoices(@RequestBody List<ChoiceDto> choices) {
        List<ChoiceDto> list = choiceService.saveChoices(choices);
        return ResponseEntity.ok(list);
    }

    // ChoiceDto 조회
    @GetMapping("/choice/getall/{questionId}")
    public ResponseEntity<List<ChoiceDto>> getAllChoices(@PathVariable("questionId") int questionId) {
        List<ChoiceDto> list = choiceService.getAllChoices(questionId);

        return ResponseEntity.ok(list);
    }

}
