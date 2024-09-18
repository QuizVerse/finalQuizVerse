package org.example.final1.repository.Study;

import java.util.List;

import org.example.final1.model.StudymemberDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudyMemberDaoInter extends JpaRepository<StudymemberDto, Integer> {
    // 특정 스터디와 사용자에 해당하는 멤버 찾기
    @Query("SELECT sm FROM StudymemberDto sm WHERE sm.study.studyId = :studyId AND sm.user.userId = :userId")
    StudymemberDto findStudyMember(@Param("studyId") int studyId, @Param("userId") int userId);
    // study_id별 멤버 수 계산 쿼리
    @Query("SELECT COUNT(sm) FROM StudymemberDto sm WHERE sm.study.studyId = :studyId")
    int countMembersByStudyId(@Param("studyId") int studyId);
    // 특정 studyId로 모든 멤버를 조회
    @Query("SELECT sm FROM StudymemberDto sm WHERE sm.study.studyId = :studyId")
    List<StudymemberDto> findByStudyStudyId(@Param("studyId") int studyId);
    // studyId와 userId로 스터디 멤버 조회
    @Query("SELECT sm FROM StudymemberDto sm WHERE sm.study.studyId = :studyId AND sm.user.userId = :userId")
    StudymemberDto findByStudyStudyIdAndUserUserId(@Param("studyId") int studyId, @Param("userId") int userId);
} 