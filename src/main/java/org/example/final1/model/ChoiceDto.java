package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "tb_choice")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "choice_id")
    private int choiceId;


    //선지 주관식일때 답안임
    @Column(name = "choice_text", nullable = false, length = 255)
    private String choiceText;

    @Column(name = "choice_image", length = 255)
    private String choiceImage;

    //질문이 선택형일때 questionid는같지만,choiceisanswer는 false인게 오답이고 true 정답
    @Column(name = "choice_isanswer")
    private Boolean choiceIsanswer;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) // 문제가 삭제되면 해당 문제도 삭제
    private QuestionDto question;

}
