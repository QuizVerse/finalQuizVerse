package org.example.final1.model;

import jakarta.persistence.*;

import java.sql.Timestamp;


@Entity
@Table(name = "tb_classmember")
public class ClassmemberDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "classmember_id")
    private int classmember_id;

    @Column(name = "classmember_role", nullable = false)
    private short classmember_role;

    @Column(name = "classmember_date", nullable = false, updatable = false)
    private Timestamp classmember_date;

    @ManyToOne
    @JoinColumn(name = "class_id", nullable = false)
    private ClassDto class_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user_id;

}
