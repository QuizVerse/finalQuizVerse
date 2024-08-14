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
@Table(name = "tb_review")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private int reviewId;

    @Column(name = "review_content", length = 255)
    private String reviewContent;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)//해당 문제집이 삭제되면 리뷰삭제
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
