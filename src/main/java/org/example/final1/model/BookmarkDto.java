package org.example.final1.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_bookmark")
public class BookmarkDto {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    @Column(name = "bookmark_id")
    private int bookmark_id;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookDto book_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user_id;
}
