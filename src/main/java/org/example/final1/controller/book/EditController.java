package org.example.final1.controller.book;

import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.util.*;

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
    private String folderName="final/book";

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
    @GetMapping("/edit/publish")
    public ResponseEntity<BookDto> saveOrUpdateBook(@RequestParam("id") int bookId, @RequestParam("isPublished") boolean isPublished) {
        Optional<BookDto> bookOpt = bookService.getBookById(bookId);

        if (bookOpt.isPresent()) {
            BookDto book = bookOpt.get();

            book.setBookIspublished(isPublished);

            // BookService를 통해 책 정보를 저장
            BookDto savedBook = bookService.saveBook(book);

            // 저장된 책 정보를 클라이언트에 반환
            return ResponseEntity.ok(savedBook);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    // ai문제 추가
    @PostMapping("/edit/ai/save")
    public ResponseEntity<String> saveSectionWithQuestions(@RequestBody Map<String, Object> requestData) {

        // ObjectMapper를 사용하여 JSON 데이터를 BookDto로 변환
        ObjectMapper objectMapper = new ObjectMapper();

        // BookDto 변환
        BookDto bookDto = objectMapper.convertValue(requestData.get("book"), BookDto.class);

        // Section 정보를 JSON에서 추출 및 변환
        SectionDto sectionDto = new SectionDto();
        int sectionNumber = sectionService.getAllSectionsByBook(bookDto).size() + 1;

        sectionDto.setSectionNumber(sectionNumber);
        sectionDto.setSectionTitle((String) requestData.get("sectionTitle"));
        sectionDto.setSectionImage("");
        sectionDto.setBook(bookDto);
        sectionDto.setSectionDescription((String) requestData.get("sectionDescription"));

        // 섹션 저장
        SectionDto savedSection = sectionService.saveSection(sectionDto);

        // Questions가 있는지 확인 후 처리
        List<Map<String, Object>> questions = (List<Map<String, Object>>) requestData.get("questions");
        if (questions != null) {
            for (Map<String, Object> questionData : questions) {
                // QuestionDto 생성 및 저장
                QuestionDto questionDto = new QuestionDto();

                // questionType을 Integer에서 Short로 변환
                Integer questionTypeInt = (Integer) questionData.get("questionType");
                questionDto.setQuestionType(questionTypeInt.shortValue());

                questionDto.setQuestionTitle((String) questionData.get("questionTitle"));
                questionDto.setQuestionSolution((String) questionData.get("questionSolution"));
                questionDto.setQuestionOrder((Integer) questionData.get("questionOrder"));
                questionDto.setQuestionDescriptionimage("");
                questionDto.setQuestionDescription("");
                questionDto.setQuestionSolutionimage("");
                questionDto.setSection(savedSection);
                questionDto.setBook(bookDto);

                // 질문 저장
                QuestionDto savedQuestion = questionService.saveQuestion(questionDto);

                // Choices가 있는지 확인 후 처리
                List<Map<String, Object>> choices = (List<Map<String, Object>>) questionData.get("choices");
                if (choices != null) {
                    for (Map<String, Object> choiceData : choices) {
                        // ChoiceDto 생성 및 저장
                        ChoiceDto choiceDto = new ChoiceDto();
                        choiceDto.setChoiceText((String) choiceData.get("choiceText"));
                        choiceDto.setQuestion(savedQuestion);  // 저장된 질문 ID 설정
                        choiceDto.setChoiceIsanswer(choiceData.get("choiceText").equals(questionData.get("correctAnswer")));
                        choiceDto.setChoiceImage("");
                        // 선택지 저장
                        choiceService.saveChoice(choiceDto);
                    }
                }
            }
        }

        return ResponseEntity.ok("저장됨");
    }

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

    // 섹션 개수 count
    @GetMapping("/section/count/{bookId}")
    public ResponseEntity<Integer> getSectionCount(@PathVariable("bookId") int bookId) {
        int sectionCount = sectionService.getSectionCountByBookId(bookId);
        return ResponseEntity.ok(sectionCount);
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
    // 질문 개수 count
    @GetMapping("/question/count/{bookId}")
    public ResponseEntity<Integer> getQuestionCount(@PathVariable("bookId") int bookId) {
        int questionCount = questionService.getQuestionCountByBookId(bookId);
        return ResponseEntity.ok(questionCount);
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

    // questionId를 가진 모든 choice 제거
    @DeleteMapping("/choice/deleteall/{id}")
    public ResponseEntity<Void> deleteChoice(@PathVariable("id") int questionId) {

        // questionId에 해당하는 모든 Choice를 가져옴
        List<ChoiceDto> choices = choiceService.getAllChoices(questionId);

        // 각 Choice에 대한 이미지 삭제
        for (ChoiceDto choice : choices) {
            String image = choice.getChoiceImage();
            if (image != null && !image.isEmpty()) {
                storageService.deleteFile(bucketName, folderName, image);
            }
        }

        // 모든 Choice 삭제
        choiceService.deleteAllChoice(questionId);

        return ResponseEntity.noContent().build();
    }

    /**
     * @description 문제 제출 후에 정답과 해설을 가져오는 API
     * 이 API는 사용자가 문제를 제출한 후에 정답과 해설을 받아볼 수 있도록 한다.
     */
    @GetMapping("/question/submit/{questionId}")
    public ResponseEntity<QuestionDto> getQuestionSolution(@PathVariable("questionId") int questionId) {
        Optional<QuestionDto> questionOpt = questionService.getQuestion(questionId);
        if (questionOpt.isPresent()) {
            QuestionDto question = questionOpt.get();
            return ResponseEntity.ok(question); // 제출 후 정답과 해설 반환
        } else {
            return ResponseEntity.notFound().build(); // 질문이 없으면 404 반환
        }
    }

}
