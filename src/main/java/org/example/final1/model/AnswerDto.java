package org.example.final1.model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "tb_answer")
public class AnswerDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private int answer_id;

    @ManyToOne
    @JoinColumn(name = "solvedbook_id", nullable = false)
    private SolvedbookDto solvedbook_id;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private QuestionDto question_id;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "answer_res", columnDefinition = "json")
    private String answer_res;

    @Column(name = "answer_correct")
    private Boolean answer_correct;

    @Column(name = "answer_order")
    private int answer_order;
}
