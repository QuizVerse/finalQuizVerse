package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    @JoinColumn(name = "solvedbook_id", nullable = false)  // 시험을 푼 책 참조
    private SolvedbookDto solvedbook;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)  // 질문 참조
    private QuestionDto question;

    // 단일 선택형 처리
    @ManyToOne
    @JoinColumn(name = "choice_id", nullable = true)  // 객관식 답안일 경우 선택한 선택지
    private ChoiceDto choice;

    // 다중 선택형 처리 (객관식 다중 선택일 경우)
    @ManyToMany
    @JoinTable(
            name = "answer_choices",  // 중간 테이블 이름
            joinColumns = @JoinColumn(name = "answer_id"),
            inverseJoinColumns = @JoinColumn(name = "choice_id")
    )
    private List<ChoiceDto> choices;

    @Column(name = "subjective_answer", length = 1000, nullable = true)  // 주관식 답안
    private String subjectiveAnswer;

    @Column(name = "answer_order", nullable = false)  // 답안 순서
    private int answerOrder;

    @Column(name = "answer_correct", nullable = true)  // 정답 여부
    private Boolean answerCorrect;  // 추후 정답 여부 계산하는 로직 추가 가능
}
