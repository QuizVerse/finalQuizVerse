package org.example.final1.service;

import org.example.final1.model.BookDto;
import org.example.final1.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import storage.NcpObjectStorageService;

import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository; // Repository를 변수로 불러오기(Dao 와 비슷함)

    @Autowired // 스프링이 BookRepository를 자동으로 주입
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public BookDto createBook(BookDto newbook) {
        return bookRepository.save(newbook);
    }

    public Optional<BookDto> getBookById(Long id) {
        return bookRepository.findById(id);
    }

}
