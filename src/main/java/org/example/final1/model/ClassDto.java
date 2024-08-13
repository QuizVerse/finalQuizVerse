package org.example.final1.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "tb_class")
public class ClassDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
    private int class_id;

    @Column(name = "class_name", nullable = false, length = 50)
    private String class_name;

    @Column(name = "class_description", nullable = false, length = 255)
    private String class_description;

    @Column(name = "class_createdate", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp class_createdate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user_id;

}
