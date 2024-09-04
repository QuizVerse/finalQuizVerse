package org.example.final1.controller.mypage;

import org.example.final1.model.BookDto;
import org.example.final1.service.PublishedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/published-books")
public class PublishedbookController {

    private final PublishedBookService publishedBookService;
    
    public PublishedbookController(PublishedBookService publishedBookService) {
        this.publishedBookService = publishedBookService;
    }

    // 사용자 ID로 책을 조회하는 엔드포인트
    @GetMapping
    public List<BookDto> getBooksByUserId(@RequestParam int userId) {
        return publishedBookService.getBooksByUserId(userId);
    }
}
