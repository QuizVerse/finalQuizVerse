package org.example.final1.repository;

import org.example.final1.model.TokenDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<TokenDto,Long> {

 /*   반환값: Optional<Token> 타입입니다. Optional은 null이 될 수 있는 값에 대한 처리를 안전하게 하기 위한 클래스로,
    데이터베이스에서 refreshToken에 해당하는 Token이 존재할 경우 Optional에 감싸서 반환합니다.
    만약 refreshToken에 해당하는 Token이 데이터베이스에 존재하지 않으면 빈 Optional을 반환합니다.*/


    Optional<TokenDto> findByRefreshToken(String refreshToken);

    void deleteByRefreshToken(String refreshToken);


}
