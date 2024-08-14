package org.example.final1.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "tb_solvedbook")
public class SolvedbookDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solvedbook_id")
    private int solvedbook_id;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookDto book_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user_id;

    @Column(name = "solvedbook_start", nullable = false)
    private Timestamp solvedbook_start;

    @Column(name = "solvedbook_end")
    private Timestamp solvedbook_end;

    @Column(name = "solvedbook_timer", nullable = false, length = 100)
    private String solvedbook_timer;
}
