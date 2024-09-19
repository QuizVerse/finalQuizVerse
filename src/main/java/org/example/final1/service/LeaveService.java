package org.example.final1.service;

import jakarta.transaction.Transactional;
import org.example.final1.model.LeaveDto;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.*;
import org.example.final1.repository.User.UserDao;
import org.example.final1.repository.User.UserDaoInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {


    @Autowired
    private LeaveRepository leaveRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserDaoInter userDaoInter;
    @Autowired
    private WrongRepository wrongRepository;
    @Autowired
    private SolvedbookRepository solvedbookRepository;
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private ClassRepository classRepository;

    // LeaveDto를 받아 처리
    public void saveLeaveReason(LeaveDto leaveDto) {
        // leaveReason이 null이 아닌지 확인 (추가적인 보호)
        if (leaveDto.getLeaveReason() == null || leaveDto.getLeaveReason().trim().isEmpty()) {
            throw new IllegalArgumentException("탈퇴 사유는 비워둘 수 없습니다.");
        }

        // 저장 로직 수행
        leaveRepository.save(leaveDto);
    }
    @Transactional
    public void deleteUserById(int userId) {
        // 1. 사용자를 찾는다.
        UserDto user = userDaoInter.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        // 2. 사용자가 푼 문제집(Solvedbook)을 먼저 삭제
        List<SolvedbookDto> solvedBooks = solvedbookRepository.findByUser(user);
        for (SolvedbookDto solvedBook : solvedBooks) {
            // 관련된 답안(Answer) 삭제
            answerRepository.deleteBySolvedbook(solvedBook);
            // 관련된 틀린 답(WrongAnswer) 삭제
            wrongRepository.deleteBySolvedbook(solvedBook);
            // Solvedbook 삭제
            solvedbookRepository.delete(solvedBook);
        }

        // 3. 사용자가 만든 책(Book) 삭제
        bookRepository.deleteByUser(user);

        // 4. 사용자를 삭제
        userDaoInter.delete(user);
    }
}
