package org.example.final1.controller.mypage;

import org.example.final1.model.BookDto;
import org.example.final1.service.PublishedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/published-books")
public class PublishedbookController {
    private final PublishedBookService publishedBookService;
    
    @GetMapping("/list")
    public List<BookDto> getMethodName(@RequestParam("user_id") int userId)
    {
        return publishedBookService.PublishedBookList(userId);
    }
    
}
