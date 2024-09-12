package org.example.final1.service;

import org.example.final1.model.BookDto;
import org.example.final1.repository.NewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewService {

    private final NewRepository newRepository;

    @Autowired
    public NewService(NewRepository newRepository) {
        this.newRepository = newRepository;
    }

    public BookDto saveBook(BookDto newbook) {
        return newRepository.save(newbook);
    }

}
