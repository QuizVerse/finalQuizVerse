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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user;

    @ManyToOne
    @JoinColumn(name = "solvedbook_id", nullable = false)
    private SolvedbookDto solvedbook;


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
