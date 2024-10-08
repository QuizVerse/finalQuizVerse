package org.example.final1.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @JsonBackReference  // 자식-부모 관계에서 자식으로 설정 (JSON에서 역참조를 막음)
    @ToString.Exclude  // 순환 참조 방지
    private SolvedbookDto solvedbook;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)  // 질문 참조
    @OnDelete(action = OnDeleteAction.CASCADE)  // 부모 질문 삭제 시 자식 답변도 삭제
    private QuestionDto question;


    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinTable(name = "tb_answerchoices",
            joinColumns = @JoinColumn(name = "answer_id"),
            inverseJoinColumns = @JoinColumn(name = "choice_id"))
    private List<ChoiceDto> choices;


    @Column(name = "subjective_answer", length = 1000, nullable = true)  // 주관식 답안
    private String subjectiveAnswer;

    @Column(name = "answer_order", nullable = false)  // 답안 순서
    private int answerOrder;

    @Column(name = "answer_correct", nullable = true)  // 정답 여부
    private Boolean answerCorrect;

    @Column(name="wrong_repeat", nullable = false)
    private int wrongRepeat;
}
