package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "tb_bookmark")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkDto {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    @Column(name = "bookmark_id")
    private int bookmarkId;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)//참조키인 문제집이 삭제되었을경우 자동삭제
    private BookDto book;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user;
}
