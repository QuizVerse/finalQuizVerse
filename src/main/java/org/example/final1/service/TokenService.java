package org.example.final1.service;

import lombok.AllArgsConstructor;
import org.example.final1.jwt.JwtProperties;
import org.example.final1.jwt.JwtTokenProvider;
import org.example.final1.model.TokenDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class TokenService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private TokenRepository tokenRepository;

    public void saveRefreshToken(String refreshToken, UserDto user, String deviceId){
        //기존 동일한 device id에 대한 토큰이 있으면 확인하고 삭제
        TokenDto existingToken=tokenRepository.findByUserAndDeviceId(user,deviceId);
        if(existingToken!=null){
            tokenRepository.delete(existingToken);
        }
        //새로운 tokendto생성
        TokenDto tokenDto = TokenDto.builder()
                .refreshToken(refreshToken)
                .user(user)
                .deviceId(deviceId)
                .expiryDate(System.currentTimeMillis() + JwtProperties.REFRESH_EXPIRATION_TIME)
                .build();

        tokenRepository.save(tokenDto);


    }

    public void deleteRefreshToken(String refreshToken){
        tokenRepository.deleteByRefreshToken(refreshToken);
    }

    public TokenDto getTokenByRefreshToken(String refreshToken) {
        TokenDto tokenDto = tokenRepository.findByRefreshToken(refreshToken);

        if (tokenDto != null) {
            // Token이 존재할 때의 로직 처리
            return tokenDto;
        } else {
            // Token이 존재하지 않을 때의 로직 처리 (예: 오류 반환, 로그아웃 처리 등)
            return null;
        }
    }

    public String refreshAccessToken(String refreshToken) {
        TokenDto tokenDto = getTokenByRefreshToken(refreshToken);

        if (tokenDto != null && tokenDto.getExpiryDate() > System.currentTimeMillis()) {
            int userId = tokenDto.getUser().getUser_id();
            String userEmail = tokenDto.getUser().getUser_email();
            return jwtTokenProvider.createToken(userId, userEmail);
        } else {
            return null; // 토큰이 유효하지 않거나 만료된 경우
        }
    }
}
