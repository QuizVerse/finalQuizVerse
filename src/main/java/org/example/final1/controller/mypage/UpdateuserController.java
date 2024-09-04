package org.example.final1.controller.mypage;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.final1.model.UserDto;
import org.example.final1.repository.User.UserDaoInter;
import org.example.final1.service.JwtService;
import org.example.final1.storage.NcpObjectStorageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/update")
public class UpdateuserController {

    private final JwtService jwtService;

    private final NcpObjectStorageService ncpObjectStorageService;

    // S3 버킷 및 폴더 경로
    private final String bucketName = "bitcamp701-129";
    private final String folderName = "final/user";
    private final UserDaoInter userDaoInter;


    @GetMapping("/user/data")
    public ResponseEntity<UserDto> getUserData(HttpServletRequest request) {
        UserDto userDto = jwtService.getUserFromJwt(request);

        if (userDto == null) {
            // 사용자 정보가 없을 경우 401 Unauthorized 응답 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } else {
            // 사용자 정보가 있을 경우, UserDto를 반환하여 클라이언트에 응답
            return ResponseEntity.ok(userDto);
        }
    }

    @PostMapping("/user/formdata")
    public ResponseEntity<String> getUserFormData(
            HttpServletRequest request,
            @RequestParam("userNickname") String userNickname,
            @RequestPart("userImage") MultipartFile userImage) {

        UserDto userDto = jwtService.getUserFromJwt(request);

        if (userDto == null) {
            // 사용자 인증 실패
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        // 파일 업로드 처리
        String uploadedFilePath = ncpObjectStorageService.uploadFile(bucketName, folderName, userImage);

        if (uploadedFilePath != null) {
            userDto.setUserImage(uploadedFilePath);
        }

        // 닉네임 업데이트
        userDto.setUserNickname(userNickname);

        userDaoInter.save(userDto);
        System.out.println("컨트롤러 오류");


        return ResponseEntity.ok("User update success");

    }
}


