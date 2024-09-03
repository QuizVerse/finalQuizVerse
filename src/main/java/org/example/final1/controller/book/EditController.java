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
import org.springframework.web.multipart.MultipartFile;
import org.example.final1.storage.NcpObjectStorageService;

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
    final NcpObjectStorageService storageService;

    private String bucketName="bitcamp701-129";
    private String folderName="book";

    //사진만 먼저 업로드
    @PostMapping("/edit/upload")
    public Map<String, String> uploadPhoto(@RequestParam("upload") MultipartFile upload)
    {
        System.out.println("photo upload>>"+upload.getOriginalFilename());
        //스토리지에 업로드후 업로드된 파일명 반환
        String photo=storageService.uploadFile(bucketName, folderName, upload);
        Map<String, String> map=new HashMap<>();
        map.put("photo", photo);
        return map;
    }


    /** 페이지 관련 */
    @GetMapping("/edit/{id}")
    public ResponseEntity<Map<String, Object>> getBookDetail(@PathVariable("id") int id) {
        Optional<BookDto> bookOpt = bookService.getBookById(id);
        if (bookOpt.isPresent()) {
            BookDto book = bookOpt.get();

            // Fetch sections, questions, and choices related to the book
            List<SectionDto> sections = sectionService.getAllSections(book.getBookId());

            // Create the response map
            Map<String, Object> response = new HashMap<>();
            response.put("book", book);
            response.put("sections", sections);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 책을 임시저장하거나 게시하기 위한 엔드포인트
    @PostMapping("/edit/publish")
    public ResponseEntity<BookDto> saveOrUpdateBook(@RequestBody BookDto bookDto, @RequestParam boolean isPublished) {
        bookDto.setBookIspublished(isPublished);

        // BookService를 통해 책 정보를 저장
        BookDto savedBook = bookService.saveBook(bookDto);

        // 저장된 책 정보를 클라이언트에 반환
        return ResponseEntity.ok(savedBook);
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

        // 섹션 설명 사진 지우기
        String image=sectionService.getSection(id).get().getSectionImage();
        storageService.deleteFile(bucketName, folderName, image);

        sectionService.deleteSection(id);
        return ResponseEntity.noContent().build();
    }

    // 섹션 모두 불러오기
    @GetMapping("/section/getall/{id}")
    public ResponseEntity<List<SectionDto>> getAllSections(@PathVariable("id") int bookId) {
        List<SectionDto> list = sectionService.getAllSections(bookId);
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
        // 문제 설명 사진 지우기
        String descriptionimage=questionService.getQuestion(id).get().getQuestionDescriptionimage();
        storageService.deleteFile(bucketName, folderName, descriptionimage);

        // 문제 해설 사진 지우기
        String solutionimage=questionService.getQuestion(id).get().getQuestionSolutionimage();
        storageService.deleteFile(bucketName, folderName, solutionimage);

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
    @GetMapping("/question/getall/{id}")
    public ResponseEntity<List<QuestionDto>> getAllQuestionsBySection(@PathVariable("id") int sectionId) {
        List<QuestionDto> list = questionService.getAllQuestions(sectionId);
        return ResponseEntity.ok(list);
    }

    /** 답안 관련 */
    // Choice 저장
    @PostMapping("/choice/new")
    public ResponseEntity<ChoiceDto> saveChoices(@RequestBody ChoiceDto choice) {
        ChoiceDto saved = choiceService.saveChoice(choice);
        return ResponseEntity.ok(saved);
    }

    // Choice 삭제
    @DeleteMapping("/choice/delete/{id}")
    public ResponseEntity<Void> deleteChoice(@PathVariable("id") Integer id) {
        // 섹션 설명 사진 지우기
        String image=choiceService.getChoice(id).get().getChoiceImage();
        storageService.deleteFile(bucketName, folderName, image);

        choiceService.deleteChoice(id);
        return ResponseEntity.noContent().build();
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
