package org.example.final1.repository.User;

import org.example.final1.model.BookDto;
import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserDaoInter extends JpaRepository<UserDto, Integer> {

    // 닉네임 중복 여부 확인 (Native Query)
    @Query(value = """
			select count(*) from tb_user where userNickname=:user_nickname
			""",nativeQuery = true)
    int getNicknamecheck(@Param("user_nickname") String user_nickname);

    // 이메일 중복 여부 확인 (Native Query)
    @Query(value = """
            SELECT COUNT(*) FROM tb_user WHERE userEmail = :user_email
            """, nativeQuery = true)
    public int getEmailcheck(@Param("user_email") String user_email);

    // 이메일로 사용자 조회 (JPQL 사용)
    @Query("SELECT u FROM UserDto u WHERE u.userEmail = :userEmail")
    UserDto findByEmail(@Param("userEmail") String userEmail);

    // 특정 필드인 userProvider를 userId로 찾는 메서드 (JPQL 사용)
    @Query("SELECT u.userProvider FROM UserDto u WHERE u.userId = :userId")
    String findUserProviderByUserId(@Param("userId") Integer userId);

    // 기본 JPA 메서드들
    UserDto findByUserId(Integer userId);

    UserDto findByUserNickname(String userNickname);

    UserDto findByUserEmail(String userEmail);

    // 추가된 부분: 닉네임에 일치하는 모든 사용자 검색 (부분 일치)
    List<UserDto> findByUserNicknameContaining(String userNickname);
}
