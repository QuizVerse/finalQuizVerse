package org.example.final1.repository;

import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Repository
//public interface FinduserRepository extends JpaRepository<UserDto, String> {
//
//}

@Repository
public interface FinduserRepository extends JpaRepository<UserDto, String> {
    boolean existsByEmail(String user_Email);
}
