package org.example.final1.service;

import org.example.final1.model.ClassDto;
import org.example.final1.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClassService {
    private final ClassRepository classRepository;

    @Autowired
    public ClassService(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    public ClassDto saveClass(ClassDto newclass) {
        return classRepository.save(newclass);
    }
}
