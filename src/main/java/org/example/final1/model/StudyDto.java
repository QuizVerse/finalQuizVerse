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
import java.util.List;

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
    private int studyId;

    @Column(name = "study_title", nullable = false, length = 50)
    private String studyTitle;

    @Column(name = "study_description", length = 255)
    private String studyDescription;

    @Column(name = "study_image", nullable = false, length = 255)
    private String studyImage;

    @Column(name = "study_memberlimit", nullable = false)
    private int studyMemberlimit;

    @Column(name = "study_status", nullable = false)
    private short studyStatus;

    @Column(name = "study_passwd", nullable = true, length = 255)
    private String studyPasswd;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private UserDto user;

    // 현재 멤버 수를 추가
    @Transient
    private int nowMember;  // DB에서 계산한 멤버 수를 저장하는 필드
}
