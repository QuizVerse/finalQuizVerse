package org.example.final1.service;

import java.util.UUID;

import org.example.final1.model.UserDto;
import org.example.final1.repository.User.UserDao;
import org.example.final1.repository.User.UserDaoInter;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {

    private final UserDaoInter userDaoInter;
    private UserDao userDao;

    public boolean getNicknamecheck(String user_nickname) {
        return userDao.getNicknamecheck(user_nickname)==1;
    }

    public void saveUser(UserDto userDto) {
        userDto.setUser_provider("local");
        userDto.setUser_providerid(UUID.randomUUID().toString());
        userDto.setUser_role("ROLE_USER");
        userDaoInter.save(userDto);

    }

    // email로 가입 여부 확인 
    public boolean getEmailcheck(String user_email) {
        return userDaoInter.getEmailcheck(user_email)==1;
    }

}
