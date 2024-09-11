package org.example.final1.repository.Study;

import java.util.List;

import org.example.final1.model.StudyDto;
import org.example.final1.model.StudymemberDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.User.UserDaoInter;
import org.springframework.stereotype.Repository;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class StudyDao {
    private StudyDaoInter studyDaoInter;
    private StudyMemberDaoInter studyMemberDaoInter;
    
    //화상방 전체 출력
    public List<StudyDto> getAllRoom()
    {
        return studyDaoInter.findAll();
    }
    //화상방 만들기
    public void insertRoom(StudyDto dto)
    {
        //study 저장
        studyDaoInter.save(dto);

        // StudyMember 생성
        StudymemberDto studymemberDto = new StudymemberDto();
        studymemberDto.setStudy(dto);  // StudyDto 수동으로 설정
        studymemberDto.setUser(dto.getUser());  // StudyDto와 연관된 UserDto 설정
        studymemberDto.setUserRole(1);  // 리더 역할

        // StudyMember 저장
        studyMemberDaoInter.save(studymemberDto);
    }

    //아이디 참조하여 Dto받아오기
    public StudyDto StudyRoomDto(int studyId)
    {
        return studyDaoInter.getReferenceById(studyId);
    }

    // 스터디 멤버 저장 메서드
    public void saveStudyMember(StudymemberDto studymemberDto)
     {
        studyMemberDaoInter.save(studymemberDto);
    }
}
