package org.example.final1.service;

import org.example.final1.model.ClassDto;
import org.example.final1.model.ClassmemberDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.ClassRepository;
import org.example.final1.repository.ClassmemberRepository;
import org.example.final1.repository.User.UserDaoInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ClassmemberService {

    @Autowired
    private ClassmemberRepository classmemberRepository;

    @Autowired
    private UserDaoInter userDaoInter;

    @Autowired
    private ClassRepository classRepository;


    public boolean inviteMember(Integer userId,Integer classId){

        UserDto userDto=userDaoInter.findByUserId(userId);
        ClassDto classDto=classRepository.findByClassId(classId);

        ClassmemberDto classmemberDto=ClassmemberDto.builder()
                .user(userDto)
                .class1(classDto)
                .classmemberRole((short) 2)
                .classmemberDate(Timestamp.from(Instant.now()))
                .build();


        try {
            classmemberRepository.save(classmemberDto);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Failed to invite member", e);
        }


    }

    public List<ClassmemberDto> getClassMembers(Integer classId) {
        // Optional을 사용하여 classId로 멤버 리스트를 조회
        Optional<List<ClassmemberDto>> optionalMembers = classmemberRepository.findByClass1_ClassId(classId);

        // 멤버 리스트가 존재하지 않을 경우 빈 리스트 반환
        return optionalMembers.orElseThrow(() -> new RuntimeException("No members found for this class"));
    }



}
