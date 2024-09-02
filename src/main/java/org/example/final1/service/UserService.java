package org.example.final1.service;

import java.util.Optional;
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


    //사용자 dto얻기
    public UserDto getUserById(int user_Id) {return userDaoInter.findByUserId(user_Id);}


    //사용자 닉네임으로 dto얻기
    public UserDto findByUserNickname(String userNickname) {
        return userDaoInter.findByUserNickname(userNickname);
    }
    public boolean updateUserPassword(String userEmail, String newPassword) {
        // 이메일로 사용자 조회
        UserDto user = userDaoInter.findByUserEmail(userEmail);

        if (user == null) {
            // 사용자가 존재하지 않으면 false 반환
            return false;
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(newPassword);

        // 암호화된 비밀번호를 사용자 객체에 설정
        user.setUserPassword(encodedPassword);

        // 변경된 사용자 정보를 저장
        userDaoInter.save(user);

        // 성공적으로 저장되면 true 반환
        return true;
    }
}
