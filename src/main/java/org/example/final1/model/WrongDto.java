package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_wrong")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WrongDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wrong_id")
    private int wrongId;



    // 유저가 삭제될 때 관련된 tb_wrong도 삭제되도록 설정
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user;

    // SolvedBook이 삭제될 때 관련된 tb_wrong도 삭제되도록 설정
    @ManyToOne
    @JoinColumn(name = "solvedbook_id", nullable = false)
    private SolvedbookDto solvedbook;

    // Question이 삭제될 때 관련된 tb_wrong도 삭제되도록 설정
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private QuestionDto question;

    @Column(name = "wrong_repeat", nullable = false)
    private int wrongRepeat;


    @Transient
    private int bookId;

    @Transient
    private String bookTitle;


}
