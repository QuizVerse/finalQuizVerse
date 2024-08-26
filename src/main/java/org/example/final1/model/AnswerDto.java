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

@Entity
@Table(name = "tb_answer")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private int answerId;

    @ManyToOne
    @JoinColumn(name = "solvedbook_id", nullable = true)
   // @OnDelete(action = OnDeleteAction.CASCADE)-> 출제자가 문제집을 삭제했을 경우 푼 사람한테 해당 문제집은 삭제되었다고 하기
    private SolvedbookDto solvedbook;


    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "answer_res", columnDefinition = "json")
    private String answerRes;

    @Column(name = "answer_correct")
    private Boolean answerCorrect;

    @Column(name = "answer_order")
    private int answerOrder;
}
