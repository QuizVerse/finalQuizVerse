package org.example.final1.service;

import java.util.List;

import org.example.final1.model.StudyDto;
import org.example.final1.model.StudymemberDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.Study.StudyDao;
import org.example.final1.repository.Study.StudyMemberDaoInter;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StudyService {
    private StudyDao studyDao;

    public List<StudyDto> getAllRoom()
    {
        return studyDao.getAllRoom();
    }

    public StudyDto insertRoom(StudyDto studyDto, UserDto userDto)
    {
        // 스터디 생성자를 설정 (방 생성자를 UserDto로 설정)
        studyDto.setUser(userDto);

        // 스터디 방 생성
        return studyDao.insertRoom(studyDto); // 저장 후 반환된 StudyDto 객체에 studyId가 있음
    }

    // 스터디 멤버로 사용자 추가
    public void addStudyMember(int studyId, UserDto userDto) {
        // studyId로 스터디 정보 가져오기
        StudyDto studyDto = studyDao.getStudyById(studyId)
            .orElseThrow(() -> new RuntimeException("Study not found with id: " + studyId));

        // DAO에 스터디 정보와 사용자 정보를 전달하여 스터디 멤버로 추가
        studyDao.addStudyMember(studyDto, userDto);
    }
    // 스터디 멤버 삭제
    @Transactional
    public void removeStudyMember(int studyId, int userId)
    {
        // DAO를 통해 스터디 멤버를 삭제하고, 리더일 경우 스터디도 삭제
        studyDao.removeStudyMember(studyId, userId);
    }
}
