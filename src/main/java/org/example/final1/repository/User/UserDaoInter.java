package org.example.final1.repository.User;

import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserDaoInter extends JpaRepository<UserDto, Integer> {

    // Check if nickname already exists (Native Query)
    @Query(value = "SELECT COUNT(*) FROM tb_user WHERE user_nickname = :userNickname", nativeQuery = true)
    int getNicknameCheck(@Param("userNickname") String userNickname);

    // Check if email already exists (Native Query)
    @Query(value = "SELECT COUNT(*) FROM tb_user WHERE user_email = :userEmail", nativeQuery = true)
    int getEmailCheck(@Param("userEmail") String userEmail);

    // Find user by email (JPQL Query)
    @Query("SELECT u FROM UserDto u WHERE u.userEmail = :userEmail")
    UserDto findByEmail(@Param("userEmail") String userEmail);

    // Find user's provider by userId (JPQL Query)
    @Query("SELECT u.userProvider FROM UserDto u WHERE u.userId = :userId")
    String findUserProviderByUserId(@Param("userId") Integer userId);

    // Default JPA methods provided by Spring Data JPA
    UserDto findByUserId(Integer userId);

    UserDto findByUserNickname(String userNickname);

    UserDto findByUserEmail(String userEmail);

    // Find all users whose nickname contains a specific string (partial match)
    List<UserDto> findByUserNicknameContaining(String userNickname);
}
