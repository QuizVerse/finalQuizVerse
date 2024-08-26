package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name="tb_book")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")

    private int bookId;

    @Column(name = "book_image", nullable = false, length = 255)
    private String bookImage;

    @Column(name = "book_title", nullable = false, length = 50)
    private String bookTitle;

    @Column(name = "book_description", nullable = false, length = 255)
    private String bookDescription;

    @Column(name = "book_status", nullable = false)
    private short bookStatus;

    @Column(name = "book_timer", nullable = false)
    private int bookTimer;

    // Foreign Key reference to UserDTO
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    //사용자가 탈퇴할시 없는 사용자라고 뜨게 해주기!
    private UserDto user;

    // Foreign Key reference to CategoryDTO
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = true)
    //카테고리가 삭제되었을시 기타라고 해주기
    private CategoryDto category;

    @Column(name = "book_divide", nullable = false)
    private short bookDivide;

    @Column(name = "book_totalscore", nullable = false)
    private int bookTotalscore;
}
