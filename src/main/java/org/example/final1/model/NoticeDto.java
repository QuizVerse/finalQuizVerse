package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "tb_notice")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private int notice_id;

    @Column(name = "notice_text", nullable = false, length = 255)
    private String notice_text;

    @Column(name = "notice_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp notice_date;
}