
package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.example.final1.model.BookmarkDto;
import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<BookmarkDto, Integer> {
    Optional<BookmarkDto> findByUserAndBook(UserDto user, BookDto book);
    List<BookmarkDto> findAllByUser(UserDto user);
    BookmarkDto findByBookmarkId(int id);
}
