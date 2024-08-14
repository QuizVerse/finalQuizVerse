package org.example.final1.model;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "tb_study")
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
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user_id;
}
