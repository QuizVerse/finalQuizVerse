package org.example.final1.repository.User;

import org.example.final1.model.UserDto;
import org.springframework.stereotype.Repository;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class UserDao {
    private UserDaoInter userDaoInter;

    public int getNicknamecheck(String user_nickname){
        return userDaoInter.getNicknameCheck(user_nickname);
    }

    public void joinUser(UserDto userDto){
        userDaoInter.save(userDto);
    }
    
     // email로 가입 여부 확인 
    public int getEmailcheck(String user_email) {
        return userDaoInter.getEmailCheck(user_email);
    }

}
