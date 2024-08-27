package org.example.final1.repository;

import org.example.final1.model.LeaveDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRepository extends JpaRepository<LeaveDto, Integer> {
}