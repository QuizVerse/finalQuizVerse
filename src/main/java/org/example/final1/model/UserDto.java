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
    private int user_Id;

    @Column(name = "user_email", nullable = false, length = 50)
    private String user_Email;

    @Column(name = "user_password", nullable = false, length = 255)
    private String user_Password;

    @Column(name = "user_nickname", nullable = false, length = 20)
    private String user_Nickname;

    @Column(name = "user_image", nullable = false, length = 255)
    private String user_Image;

    @Column(name = "user_createdate", nullable = false, updatable = false)
    @CreationTimestamp  //현재시간으로 세팅
    private Timestamp user_CreateDate;

    @Column(name = "user_social", nullable = false, length = 20)
    private String user_Social;

}
