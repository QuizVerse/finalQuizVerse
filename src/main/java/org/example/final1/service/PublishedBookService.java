package org.example.final1.service;

import org.example.final1.model.BookDto;
import org.example.final1.repository.Published.PublishedBookDao;
import org.example.final1.repository.Published.PublishedBookDaoInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import java.util.List;

@Service
@AllArgsConstructor
public class PublishedBookService {
    private PublishedBookDao publishedBookDao;

    public List<BookDto> PublishedBookList(int userId)
    {
        return publishedBookDao.PublishedBookList(userId);
    }
}
