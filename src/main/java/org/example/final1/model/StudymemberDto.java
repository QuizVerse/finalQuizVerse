package org.example.final1.model;


import jakarta.persistence.*;

@Entity
@Table(name = "tb_studymember")
public class StudymemberDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "studymember_id")
    private int studymember_id;

    @Column(name = "user_role", nullable = false)
    private int user_role;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user_id;

    @ManyToOne
    @JoinColumn(name = "study_id", nullable = false)
    private StudyDto study_id;
}
