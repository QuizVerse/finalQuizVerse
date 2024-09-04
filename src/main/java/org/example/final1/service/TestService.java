package org.example.final1.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.final1.model.SolvedbookDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;

    public UserDto findUsernameById(int userId) {
        Optional<UserDto> userDto = testRepository.findById(userId);
        return userDto.orElse(null);
    }
}
