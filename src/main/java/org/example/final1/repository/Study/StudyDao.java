package org.example.final1.repository.Study;

import java.util.List;
import java.util.Optional;

import org.example.final1.model.StudyDto;
import org.example.final1.model.StudymemberDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.User.UserDaoInter;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class StudyDao {
    private StudyDaoInter studyDaoInter;
    private StudyMemberDaoInter studyMemberDaoInter;
    
    //화상방 전체 출력
    public List<StudyDto> getAllRoom()
    {
        List<StudyDto> studies = studyDaoInter.findAll();
        // 각 스터디에 대한 멤버 수를 계산하고 설정
        for (StudyDto study : studies) {
            int memberCount = studyMemberDaoInter.countMembersByStudyId(study.getStudyId());
            study.setNowMember(memberCount);  // 현재 멤버 수 설정
        }
        return studies;
    }
    //화상방 만들기
    public StudyDto insertRoom(StudyDto dto)
    {
        // 스터디 저장
        StudyDto savedStudy = studyDaoInter.save(dto);

        // StudyMember 생성 (스터디 리더로 저장)
        StudymemberDto studymemberDto = StudymemberDto.builder()
            .study(savedStudy)               // 저장된 스터디 엔티티 설정
            .user(savedStudy.getUser())      // 스터디를 생성한 사용자 설정
            .userRole(1)                     // 리더 역할 설정 (1)
            .build();

        // 스터디 멤버 저장
        studyMemberDaoInter.save(studymemberDto);
        // 생성된 스터디 객체 반환
        return savedStudy;
    }

    // 스터디 멤버 추가 메서드
    public void addStudyMember(StudyDto studyDto, UserDto userDto) 
    {
        // 새로운 스터디 멤버를 생성
        StudymemberDto studymemberDto = StudymemberDto.builder()
            .study(studyDto)  // 스터디 정보 설정
            .user(userDto)    // 사용자 정보 설정 (스터디 멤버로 추가될 사용자)
            .userRole(0)      // 0: 일반 멤버
            .build();

        // 스터디 멤버 저장
        studyMemberDaoInter.save(studymemberDto);
    }
    
    // 특정 studyId로 스터디 정보 가져오기
    public Optional<StudyDto> getStudyById(int studyId)
    {
        return studyDaoInter.findById(studyId);
    }
    // 화상방 나갈때 스터디 멤버 삭제
    @Transactional
    public void removeStudyMember(int studyId, int userId) 
    {
        StudymemberDto studymember = studyMemberDaoInter.findStudyMember(studyId, userId);
        
        if (studymember == null) {
            // 멤버가 존재하지 않으면 로그 출력 또는 예외 처리
            throw new RuntimeException("스터디 멤버를 찾을 수 없습니다.");
        }
    
        // 멤버 삭제
        studyMemberDaoInter.delete(studymember);
    
        // 리더인 경우 스터디 삭제
        if (studymember.getUserRole() == 1) {
            studyDaoInter.deleteById(studyId);
        }
    }
    // 특정 studyId로 스터디 멤버 목록 가져오기
    public List<StudymemberDto> getStudyMembers(int studyId) {
        return studyMemberDaoInter.findByStudyStudyId(studyId);
    }
     // studyId와 userId로 특정 멤버 찾기
     public StudymemberDto getStudyMemberByStudyIdAndUserId(int studyId, int userId) {
        return studyMemberDaoInter.findByStudyStudyIdAndUserUserId(studyId, userId);
    }
}
