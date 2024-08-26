package org.example.final1.repository.User;

import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserDaoInter extends JpaRepository<UserDto, Integer> {

    @Query(value = """
			select count(*) from tb_user where userNickname=:user_nickname
			""",nativeQuery = true)
    public int getNicknamecheck(@Param("user_nickname") String user_nickname);

    // email로 가입 여부 확인 
    @Query(value = """
            SELECT COUNT(*) FROM tb_user WHERE userEmail = :user_email
            """, nativeQuery = true)
    public int getEmailcheck(@Param("user_email") String user_email);

    @Query("SELECT u FROM UserDto u WHERE u.userEmail = :user_email")
    public UserDto findByEmail(@Param("user_email") String user_email);



}
