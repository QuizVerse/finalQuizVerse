package org.example.final1.repository.User;

import lombok.AllArgsConstructor;
import org.example.final1.model.UserDto;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class UserDao {
    private UserDaoInter userDaoInter;

    public int getNicknamecheck(String user_nickname){
        return userDaoInter.getNicknamecheck(user_nickname);
    }

    public void joinUser(UserDto userDto){
        userDaoInter.save(userDto);
    }




}
