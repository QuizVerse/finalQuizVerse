// package org.example.final1.repository.Published;

// import org.example.final1.model.BookDto;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;

// import jakarta.transaction.Transactional;

// import java.util.List;

// public interface PublishedBookDaoInter extends JpaRepository<BookDto, Integer> {
    
//     @Query(value = """
//             SELECT * FROM tb_book WHERE user_id = :user
//             """, nativeQuery = true)
//     public List<BookDto> PublishedBookList(@Param("user") int userId);
// }
