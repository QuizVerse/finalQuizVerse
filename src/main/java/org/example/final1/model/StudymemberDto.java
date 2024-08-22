package org.example.final1.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "tb_studymember")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    @OnDelete(action = OnDeleteAction.CASCADE)//study가 삭제되면 해당 dto삭제
    private StudyDto study;
}
