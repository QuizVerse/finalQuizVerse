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
public class PrincipalDetailService implements UserDetailsService {
    @Autowired
    private UserDaoInter userDaoInter;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        /*UserDto userEntity=userDaoInter.findByUserEmail(username);
        if(userEntity==null){
            return new PrincipalDetails(userEntity);
        }
*/

        return null;
    }
}
