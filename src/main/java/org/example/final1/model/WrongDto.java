package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_wrong")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WrongDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wrong_id")
    private int wrong_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user;

    @ManyToOne
    @JoinColumn(name = "solvedbook_id", nullable = false)
    private SolvedbookDto solvedbook;

    @Column(name = "wrong_order", nullable = false)
    private int wrong_order;

    @Column(name = "wrong_repeat", nullable = false)
    private int wrong_repeat;
}
