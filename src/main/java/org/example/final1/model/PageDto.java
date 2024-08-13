package org.example.final1.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_page")
public class PageDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "page_id")
    private int page_id;

    @Column(name = "page_number", nullable = false)
    private int page_number;

    @Column(name = "page_title", nullable = false, length = 50)
    private String page_title;

    @Column(name = "page_description", length = 255)
    private String page_description;

    @Column(name = "page_image", length = 255)
    private String page_image;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookDto book_id;
}
