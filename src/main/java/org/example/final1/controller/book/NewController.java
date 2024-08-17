package org.example.final1.controller.book;

import lombok.RequiredArgsConstructor;
import org.example.final1.service.NewBookService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import storage.NcpObjectStorageService;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/")
public class NewController {
    private final NewBookService newBookService;
    private final NcpObjectStorageService storageService;

    String bucketName ="";
    String folderName="";
}
