package org.example.final1.controller.mypage;

import java.util.List;

import org.example.final1.model.BookDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.BookmarkService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmark")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    // bookmark가 있으면 삭제, 없으면 추가
    @PostMapping("/toggle")
    public void toggleBookmark(@RequestParam("user") UserDto user,
                               @RequestParam("book") BookDto book) {

        bookmarkService.toggleBookmark(user, book);
    }

}
