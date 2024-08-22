package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "tb_page")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BookDto book;
}
