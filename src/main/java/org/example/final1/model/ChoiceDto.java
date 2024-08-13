package org.example.final1.model;

import jakarta.persistence.*;

@Entity
@Table(name="tb_choice")
public class ChoiceDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "choice_id")
    private int choice_id;

    @Column(name = "choice_text", nullable = false, length = 255)
    private String choice_text;

    @Column(name = "choice_image", length = 255)
    private String choice_image;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private QuestionDto question_id;
}
