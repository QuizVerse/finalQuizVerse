package org.example.final1.service;

import org.example.final1.model.LeaveDto;
import org.example.final1.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    public void saveLeaveReason(String reason) {
        LeaveDto leaveDto = new LeaveDto();
        leaveDto.setLeaveReason(reason);
        leaveRepository.save(leaveDto);
    }
}
