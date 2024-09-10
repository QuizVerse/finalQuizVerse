package org.example.final1.service;

import java.util.List;

import org.example.final1.model.StudyDto;
import org.example.final1.model.StudymemberDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.Study.StudyDao;
import org.example.final1.repository.Study.StudyMemberDaoInter;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StudyService {
    private StudyDao studyDao;

    public List<StudyDto> getAllRoom()
    {
        return studyDao.getAllRoom();
    }

    public void insertRoom(StudyDto dto)
    {
        studyDao.insertRoom(dto);
    }

    public StudyDto StudyRoomDto(int studyId)
    {
        return studyDao.StudyRoomDto(studyId);
    }

    public void saveStudyMember(StudymemberDto studymemberDto) 
    {
        studyDao.saveStudyMember(studymemberDto);
    }
}
