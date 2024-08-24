package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_token")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long token_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user; // UserDto와 연관관계

    @Column(name = "refresh_token", nullable = false, length = 255)
    private String refreshToken;

    @Column(name = "expiry_date", nullable = false)
    private Long expiryDate;

    @Transient // DB에는 저장되지 않지만, DTO에서 사용될 수 있음
    private String accessToken;
}
