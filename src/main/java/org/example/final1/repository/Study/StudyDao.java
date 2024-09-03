package org.example.final1.repository.Study;

import java.util.List;

import org.example.final1.model.StudyDto;
import org.springframework.stereotype.Repository;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class StudyDao {
    private StudyDaoInter studyDaoInter;

    public List<StudyDto> getAllRoom()
    {
        return studyDaoInter.findAll();
    }
}
