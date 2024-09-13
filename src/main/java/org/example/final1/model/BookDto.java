package org.example.final1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;

@Entity
@Table(name="tb_book")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BookDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private int bookId;

    @Column(name = "book_image", nullable = false, length = 255)
    private String bookImage;

    @Column(name = "book_title", nullable = false, length = 50)
    private String bookTitle;

    @Column(name = "book_description", nullable = false, length = 2000)
    private String bookDescription;

    // 0 : 공개, 1 : 클래스 공개, 2 : 비공개
    @Column(name = "book_status", nullable = false)
    private short bookStatus;

    @Column(name = "book_timer", nullable = false)
    private int bookTimer;

    @Column(name = "book_createdate", updatable = false)
    @CreationTimestamp
    private Timestamp bookCreatedate;

    // Foreign Key reference to UserDTO
//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    //사용자가 탈퇴할시 없는 사용자라고 뜨게 해주기!
    private UserDto user;

    // Foreign Key reference to CategoryDTO
//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = true)
    //카테고리가 삭제되었을시 기타라고 해주기
    private CategoryDto category;

    @Column(name = "book_divide", nullable = false)
    private short bookDivide;

    @Column(name = "book_totalscore", nullable = false)
    private int bookTotalscore;

    @Column(name = "book_ispublished", nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    @Builder.Default
    private boolean bookIspublished = false;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = true)
    //카테고리가 삭제되었을시 기타라고 해주기
    private ClassDto class1;


}
