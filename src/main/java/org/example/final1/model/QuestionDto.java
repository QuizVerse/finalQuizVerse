package org.example.final1.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Entity
@Table(name = "tb_question")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private int questionId;

    @Column(name = "question_text", nullable = false, length = 255)
    private String questionText;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "question_res", columnDefinition = "json", nullable = false)
    private List<ChoiceDto> questionRes;  // JSON stored as a List<String>

    @Column(name = "question_description", length = 3000)
    private String questionDescription;

    @Column(name = "question_descriptionimage", length = 255)
    private String questionDescriptionimage;

    @Column(name = "question_solution", length = 3000)
    private String questionSolution;

    @Column(name = "question_solutionimage", length = 255)
    private String questionSolutionimage;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) // 문제집이 삭제되면 해당 문제도 삭제
    private BookDto book;

    @Column(name = "question_order", nullable = false)
    private int questionOrder;

    @Column(name = "question_point", nullable = false)
    private int questionPoint;


    @ManyToOne
    @JoinColumn(name = "section_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) // 페이지가 삭제되면 해당 문제도 삭제
    private SectionDto section;
}
