package org.example.final1.repository.Study;

import java.util.List;

import org.example.final1.model.StudyDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.User.UserDaoInter;
import org.springframework.stereotype.Repository;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class StudyDao {
    private StudyDaoInter studyDaoInter;
    private UserDaoInter userDaoInter;
    //화상방 전체 출력
    public List<StudyDto> getAllRoom()
    {
        return studyDaoInter.findAll();
    }
    //화상방 만들기
    public void insertRoom(StudyDto dto)
    {
        studyDaoInter.save(dto);
    }
}
