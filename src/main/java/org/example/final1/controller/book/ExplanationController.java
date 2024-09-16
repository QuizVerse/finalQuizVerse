package org.example.final1.controller.book;


import org.example.final1.model.AnswerDto;
import org.example.final1.model.BookDto;
import org.example.final1.service.AnswerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/book")
public class ExplanationController {

    private final AnswerService answerService;

    public ExplanationController(AnswerService answerService) {
        this.answerService = answerService;
    }

    // 사용자의 답안을 가져오는 API
    @GetMapping("/user/answer")
    public ResponseEntity<List<AnswerDto>> getUserAnswers(
            @RequestParam int solvedbookId,  // 사용자가 푼 solvedbookId
            @RequestParam int wrongRepeat  // 오답 반복 여부
    ) {
        // AnswerService에서 답안을 조회
        List<AnswerDto> userAnswers = answerService.getAnswersBySolvedbookAndWrongRepeat(solvedbookId, wrongRepeat);

        if (userAnswers != null && !userAnswers.isEmpty()) {
            return ResponseEntity.ok(userAnswers);
        } else {
            return ResponseEntity.notFound().build();  // 답안이 없을 경우 404 응답
        }
    }

}
