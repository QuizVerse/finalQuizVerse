package org.example.final1.repository.Study;

import org.example.final1.model.StudymemberDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyMemberDaoInter extends JpaRepository<StudymemberDto, Integer> {
    // 특정 스터디와 사용자에 해당하는 멤버 찾기
    StudymemberDto findByStudyIdAndUserId(int studyId, int userId);
} 