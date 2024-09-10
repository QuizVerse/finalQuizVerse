package org.example.final1.controller.mypage;

import org.example.final1.model.BookDto;
import org.example.final1.model.SolvedBookInfoDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.SolvedbookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/solvedbook")
public class SolvedBookController {

    private final SolvedbookService solvedbookService;

    // 사용자의 힉습이력 출력
    @GetMapping("/getall/{id}")
    public ResponseEntity<List<SolvedBookInfoDto>> getUserBooks(@PathVariable("id") int userId) {
        List<SolvedBookInfoDto> solvedBookInfo = solvedbookService.getSolvedBooksByUserId(userId);

        if (solvedBookInfo.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(solvedBookInfo, HttpStatus.OK);
    }
}