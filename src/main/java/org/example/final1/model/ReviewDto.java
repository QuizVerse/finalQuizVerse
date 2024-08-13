package org.example.final1.model;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;


import java.sql.Timestamp;

@Entity
@Table(name = "tb_review")
public class ReviewDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private int reviewId;

    @Column(name = "review_content", length = 255)
    private String reviewContent;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookDto book;

    @Column(name = "review_rate", nullable = false)
    private int review_rate;

    @Column(name = "review_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp review_date;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user;
}
