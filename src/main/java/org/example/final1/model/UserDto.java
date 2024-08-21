package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "tb_user")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int user_id;

    @Column(name = "user_email", nullable = false, length = 50)
    private String user_email;

    @Column(name = "user_password", nullable = false, length = 255)
    private String user_password;

    @Column(name = "user_nickname", nullable = false, length = 100)
    private String user_nickname;

    @Column(name = "user_image", length = 255)
    private String user_image;

    @Column(name = "user_createdate", nullable = false, updatable = false)
    @CreationTimestamp  //현재시간으로 세팅
    private Timestamp user_createdate;

    @Column(name = "user_provider", nullable = false, length = 80)
    private String user_provider;

    @Column(name = "user_providerid", nullable = false, length = 80)
    private String user_providerid;


    @Column(name = "user_role", nullable = false, length = 50)
    private String user_role;

    @Builder
    public UserDto(String user_email, String user_password, String user_nickname, String user_image, Timestamp user_createdate, String user_providerid, String user_provider, String user_role) {
        this.user_email = user_email;
        this.user_password = user_password;
        this.user_nickname = user_nickname;
        this.user_image = user_image;
        this.user_createdate = user_createdate;
        this.user_providerid = user_providerid;
        this.user_provider = user_provider;
        this.user_role = user_role;
    }

}
