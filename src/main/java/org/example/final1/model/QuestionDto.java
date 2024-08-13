package org.example.final1.model;


import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;

import org.hibernate.type.SqlTypes;

import java.util.List;

@Entity
@Table(name = "tb_question")
public class QuestionDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private int question_id;

    @Column(name = "question_text", nullable = false, length = 255)
    private String question_text;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "question_res", columnDefinition = "json", nullable = false)
    private List<String> question_res;  // JSON stored as a List<String>

    @Column(name = "question_description", length = 3000)
    private String question_description;

    @Column(name = "question_descriptionimage", length = 255)
    private String question_descriptionimage;

    @Column(name = "question_solution", length = 3000)
    private String question_solution;

    @Column(name = "question_solutionimage", length = 255)
    private String question_solutionimage;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookDto book_id;

    @Column(name = "question_order", nullable = false)
    private int question_order;

    @Column(name = "question_point", nullable = false)
    private int question_point;


    @ManyToOne
    @JoinColumn(name = "page_id", nullable = false)
    private PageDto page_id;
}
