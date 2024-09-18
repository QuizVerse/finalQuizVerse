package org.example.final1.service;

import org.example.final1.model.LeaveDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.LeaveRepository;
import org.example.final1.repository.User.UserDao;
import org.example.final1.repository.User.UserDaoInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeaveService {


    @Autowired
    private LeaveRepository leaveRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserDaoInter userDaoInter;

    // LeaveDto를 받아 처리
    public void saveLeaveReason(LeaveDto leaveDto) {
        // leaveReason이 null이 아닌지 확인 (추가적인 보호)
        if (leaveDto.getLeaveReason() == null || leaveDto.getLeaveReason().trim().isEmpty()) {
            throw new IllegalArgumentException("탈퇴 사유는 비워둘 수 없습니다.");
        }

        // 저장 로직 수행
        leaveRepository.save(leaveDto);
    }

    public void deleteUserById(int userId) {
        // 사용자의 모든 책 레코드에서 user_id를 null로 설정
        bookRepository.updateUserIdToNullByUserId(userId); // 해당 메서드 추가 필요
        userDaoInter.deleteById(userId); // 인스턴스를 통해 호출
    }
}
