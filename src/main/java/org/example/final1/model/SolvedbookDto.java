package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "tb_solvedbook")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolvedbookDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solvedbook_id")
    private int solvedbookId;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = true)
    //해당 문제집이 삭제되더라도 삭제된 문제집이라고만 뜨게 하기
    private BookDto book;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user;

    @Column(name = "solvedbook_start", nullable = false)
    private Timestamp solvedbookStart;

    @Column(name = "solvedbook_end")
    private Timestamp solvedbookEnd;

    @Column(name = "solvedbook_timer", nullable = false, length = 100)
    private String solvedbookTimer;
}
