package org.example.final1.service;

import org.example.final1.repository.FinduserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FinduserService {

//    @Autowired
//    private FinduserRepository finduserRepository;
//
//    public boolean checkEmailExist(String email) {
//        return finduserRepository.existsById(email);
//    }

    @Autowired
    private FinduserRepository finduserRepository;

    public boolean existsByEmail(String user_Email) {
        return finduserRepository.existsByEmail(user_Email);
    }
}
