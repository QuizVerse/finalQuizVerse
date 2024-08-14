package org.example.final1.model;

import jakarta.persistence.*;

@Entity
@Table(name="tb_book")
public class BookDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private int book_Id;

    @Column(name = "book_image", nullable = false, length = 255)
    private String book_image;

    @Column(name = "book_title", nullable = false, length = 50)
    private String book_title;

    @Column(name = "book_description", nullable = false, length = 255)
    private String book_description;

    @Column(name = "book_status", nullable = false)
    private short book_status;

    @Column(name = "book_timer", nullable = false)
    private int book_timer;

    // Foreign Key reference to UserDTO
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user;

    // Foreign Key reference to CategoryDTO
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryDto category;

    @Column(name = "book_divide", nullable = false)
    private short book_divide;

    @Column(name = "book_totalgrade", nullable = false)
    private int book_totalgrade;
}
