package org.example.final1.repository;

import org.example.final1.model.TokenDto;
import org.example.final1.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<TokenDto,Long> {


    TokenDto findByUserAndDeviceId(UserDto user, String deviceId);

    TokenDto findByRefreshToken(String refreshToken);

    void deleteByRefreshToken(String refreshToken);


}
