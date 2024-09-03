package org.example.final1.service;

import java.util.List;

import org.example.final1.model.StudyDto;
import org.example.final1.repository.Study.StudyDao;
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
}
