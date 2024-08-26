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

    //닉네임 중복확인
    public boolean getNicknamecheck(String user_nickname) {
        return userDao.getNicknamecheck(user_nickname)==1;
    }
    //회원저장
    public void saveUser(UserDto userDto) {
        userDto.setUserProvider("local");
        userDto.setUserProviderid(UUID.randomUUID().toString());
        userDto.setUserRole("ROLE_USER");
        userDaoInter.save(userDto);

    }

    // email로 가입 여부 확인
    public boolean getEmailcheck(String user_email) {
        return userDaoInter.getEmailcheck(user_email)==1;
    }

    //회원 탈퇴
    public void deleteUserById(int user_Id) {
        userDaoInter.deleteById(user_Id); // user_id로 사용자 삭제
    }

}
