package org.example.final1.config.oauth;


import org.example.final1.repository.User.UserDaoInter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class LogoutService {

    private final UserDaoInter userDaoInter;

    @Autowired
    public LogoutService(UserDaoInter userDaoInter) {
        this.userDaoInter = userDaoInter;
    }

    public String findUserProviderByUserId(Integer userId) {
        String provider =userDaoInter.findUserProviderByUserId(userId);

        if(provider == "kakao"){
            
        } else if (provider == "naver") {


        } else {

        }

        return userDaoInter.findUserProviderByUserId(userId);
    }


}
