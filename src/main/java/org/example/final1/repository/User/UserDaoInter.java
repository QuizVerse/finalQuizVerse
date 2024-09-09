package org.example.final1.repository.User;

import org.example.final1.model.BookDto;
import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserDaoInter extends JpaRepository<UserDto, Integer> {

    @Query(value = """
			select count(*) from tb_user where user_nickname=:user_nickname
			""",nativeQuery = true)
    int getNicknamecheck(@Param("user_nickname") String user_nickname);

    // email로 가입 여부 확인
    @Query(value = "SELECT COUNT(*) FROM tb_user WHERE user_email = :user_email", nativeQuery = true)
    int getEmailcheck(@Param("user_email") String user_email);

    @Query("SELECT u FROM UserDto u WHERE u.userEmail = :user_email")
    UserDto findByEmail(@Param("user_email") String user_email);


    String findUserProviderByUserId(Integer userId);

    UserDto findByUserId(Integer userId);

    UserDto findByUserNickname(String userNickname);

    UserDto findByUserEmail(String userEmail);

    // 추가된 부분: 닉네임에 일치하는 모든 사용자 검색 (부분 일치)
    List<UserDto> findByUserNicknameContaining(String userNickname);
}
