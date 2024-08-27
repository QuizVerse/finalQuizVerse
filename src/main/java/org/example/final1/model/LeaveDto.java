package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "tb_leave")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaveDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leave_id")
    private int leaveId;

    @Column(name = "leave_reason", nullable = false, length = 255)
    private String leaveReason;

    @Column(name = "leave_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp leaveDate;

}
