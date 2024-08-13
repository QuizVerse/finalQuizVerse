package org.example.final1.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "tb_leave")
public class LeaveDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leave_id")
    private int leave_id;

    @Column(name = "leave_reason", nullable = false, length = 255)
    private String leave_reason;

    @Column(name = "leave_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp leave_date;
}
