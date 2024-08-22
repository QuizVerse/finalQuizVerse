package org.example.final1.config.auth;

import lombok.AllArgsConstructor;
import org.example.final1.model.UserDto;
import org.example.final1.repository.User.UserDao;
import org.example.final1.repository.User.UserDaoInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//시큐리티 설정에서 loginprocessurl로 걸어놓은 account/login
//저 경로로 요청이 오면 자동으로 userdetailsservice 타입으로 ioc되어있는 loadbyusername함수가 실행이됨
//규칙인거임

@Service
@AllArgsConstructor
public class PrincipalDetailService implements UserDetailsService {
    private final UserDaoInter userDaoInter;

    //시큐리티 session = 내부 authentication=내부 userdetails
    //함수 종료시 @AuthenticationPricipal 어노테이션이 만드어진다.

    @Override
    public UserDetails loadUserByUsername(String user_email) throws UsernameNotFoundException {
        UserDto userDto=userDaoInter.findByEmail(user_email);
        if(userDto!=null){
            return new PrincipalDetails(userDto);
        }

        System.out.println("User not found with email: " + user_email);
       return null;
    }
}
