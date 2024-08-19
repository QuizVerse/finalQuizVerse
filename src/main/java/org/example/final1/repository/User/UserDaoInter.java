package org.example.final1.repository.User;

import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserDaoInter extends JpaRepository<UserDto, Integer> {

    @Query(value = """
			select count(*) from tb_user where user_nickname=:user_nickname
			""",nativeQuery = true)
    public int getNicknamecheck(@Param("user_nickname") String user_nickname);


    @Query("SELECT u FROM UserDto u WHERE u.user_email = :user_email")
    public UserDto findByEmail(@Param("user_email") String user_email);

    @Query("SELECT COUNT(u) FROM UserDto u WHERE u.user_email = :user_email")
    int countByUser_email(@Param("user_email") String user_email);



}
