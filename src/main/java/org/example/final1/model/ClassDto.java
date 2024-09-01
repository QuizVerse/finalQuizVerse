package org.example.final1.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;

@Entity
@Table(name = "tb_class")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "class_id")
    private int classId;

    @Column(name = "class_name", nullable = false, length = 50)
    private String className;

    @Column(name = "class_description", nullable = false, length = 255)
    private String classDescription;

    @Column(name = "class_createdate", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp classCreatedate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private UserDto user;

}
