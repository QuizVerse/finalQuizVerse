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
    private int userId;

    @Column(name = "user_email", nullable = false, length = 50)
    private String userEmail;

    @Column(name = "user_password", nullable = false, length = 255)
    private String userPassword;

    @Column(name = "user_nickname", nullable = false, length = 100)
    private String userNickname;

    @Column(name = "user_image", length = 255)
    private String userImage;

    @Column(name = "user_createdate", nullable = false, updatable = false)
    @CreationTimestamp  //현재시간으로 세팅
    private Timestamp userCreatedate;

    @Column(name = "user_provider", nullable = false, length = 80)
    private String userProvider;

    @Column(name = "user_providerid", nullable = false, length = 80)
    private String userProviderid;


    @Column(name = "user_role", nullable = false, length = 50)
    private String userRole;

    @Column(name = "user_accesstoken", nullable = false, length = 70)
    private String userAccessToken;


    @Builder
    public UserDto(String userEmail, String userPassword, String userNickname, String userImage, Timestamp userCreatedate, String userProviderid, String userProvider, String userRole,String userAccessToken) {
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userNickname = userNickname;
        this.userImage = userImage;
        this.userCreatedate = userCreatedate;
        this.userProviderid = userProviderid;
        this.userProvider = userProvider;
        this.userRole = userRole;
        this.userAccessToken = userAccessToken;
    }

}
