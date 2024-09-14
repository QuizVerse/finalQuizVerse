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
        return studyDaoInter.findAll();
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
    // // 화상방 나갈때 스터디 멤버 삭제
    // @Transactional
    // public void removeStudyMember(int studyId, int userId) 
    // {
    //     StudymemberDto studymember = studyMemberDaoInter.findStudyMember(studyId, userId);
    //     // if (studymember != null) 
    //     // {
    //     //     //멤버 삭제
    //     //     studyMemberDaoInter.delete(studymember);
    //     //     // 만약 리더(user_role == 1)라면 스터디도 삭제
    //     //     if (studymember.getUserRole() == 1) {
    //     //         studyDaoInter.deleteById(studyId);
    //     //     }
    //     // }
    //     if (studymember == null) {
    //         // 멤버가 존재하지 않으면 로그 출력 또는 예외 처리
    //         throw new RuntimeException("스터디 멤버를 찾을 수 없습니다.");
    //     }
    
    //     // 멤버 삭제
    //     studyMemberDaoInter.delete(studymember);
    
    //     // 리더인 경우 스터디 삭제
    //     if (studymember.getUserRole() == 1) {
    //         studyDaoInter.deleteById(studyId);
    //     }
    // }

    @Transactional
public void removeStudyMember(int studyId, int userId) {
    try {
        // 스터디 멤버 찾기
        StudymemberDto studymember = studyMemberDaoInter.findStudyMember(studyId, userId);
        if (studymember == null) {
            // 멤버가 없으면 로그 출력 및 예외 발생
            throw new RuntimeException("스터디 멤버를 찾을 수 없습니다. studyId: " + studyId + ", userId: " + userId);
        }

        // 멤버 삭제
        studyMemberDaoInter.delete(studymember);

        // 만약 리더라면 스터디 자체를 삭제
        if (studymember.getUserRole() == 1) {
            studyDaoInter.deleteById(studyId);
            System.out.println("스터디가 삭제되었습니다. studyId: " + studyId);
        } else {
            System.out.println("스터디 멤버가 삭제되었습니다. userId: " + userId);
        }
    } catch (Exception e) {
        // 예외 발생 시 트랜잭션 롤백 및 로그 출력
        System.err.println("스터디 멤버 삭제 중 오류 발생: " + e.getMessage());
        throw e; // 예외를 다시 던져 트랜잭션을 롤백함
    }
}

}
