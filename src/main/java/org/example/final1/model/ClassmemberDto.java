package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;


@Entity
@Table(name = "tb_classmember")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassmemberDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "classmember_id")
    private int classmemberId;

    @Column(name = "classmember_role", nullable = false)
    private short classmemberRole;

    @Column(name = "classmember_date", nullable = false, updatable = false)
    private Timestamp classmemberDate;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)//class가 삭제되었을시 calssmember dto삭제됨
    private ClassDto class1; //class 변수명으로 안되어서 class1로 지정했어여

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user;

}
