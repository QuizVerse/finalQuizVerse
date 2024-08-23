package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "tb_section")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SectionDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "section_id")
    private int section_id;

    @Column(name = "section_number", nullable = false)
    private int section_number;

    @Column(name = "section_title", nullable = false, length = 50)
    private String section_title;

    @Column(name = "section_description", length = 255)
    private String section_description;

    @Column(name = "section_image", length = 255)
    private String section_image;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BookDto book;
}
