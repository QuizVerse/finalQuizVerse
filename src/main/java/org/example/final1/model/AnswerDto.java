package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private SolvedbookDto solvedbook;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)  // 질문 참조
    private QuestionDto question;

    @ManyToOne
    @JoinColumn(name = "choice_id", nullable = true)  // 객관식/선택형 문제에 대한 답변 선택
    private ChoiceDto choice;  // 선택형 문제일 경우 사용자가 선택한 답안

    @Column(name = "subjective_answer", length = 1000, nullable = true)  // 주관식 답안
    private String subjectiveAnswer;  // 주관식 문제에 대한 사용자의 답변

    @Column(name = "answer_correct")
    private Boolean answerCorrect;  // 정답 여부

    @Column(name = "answer_order")
    private int answerOrder;  // 사용자가 문제를 푼 순서
}
