package org.example.final1.model;


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
@Table(name = "tb_study")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "study_id")
    private int study_id;

    @Column(name = "study_title", nullable = false, length = 50)
    private String study_title;

    @Column(name = "study_description", length = 255)
    private String study_description;

    @Column(name = "study_image", nullable = false, length = 255)
    private String study_image;

    @Column(name = "study_memberlimit", nullable = false)
    private int study_memberlimit;

    @Column(name = "study_status", nullable = false)
    private short study_status;

    @Column(name = "study_createdate", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp study_createdate;

    @Column(name = "study_url", nullable = false, length = 255)
    private String study_url;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private UserDto user;
}
