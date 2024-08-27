package org.example.final1.repository;

import org.example.final1.model.BookDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<BookDto,Long> {

    //JpaRepository 안에 있는 메서드들 이외의 메서드를 쓰고 싶으면 여디가 선언해주기

}