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
    public ResponseEntity<String> updateUserData(
            HttpServletRequest request,
            @RequestParam(value = "userNickname", required = false) String userNickname,
            @RequestPart(value = "userImage", required = false) MultipartFile userImage) {

        UserDto userDto = jwtService.getUserFromJwt(request);

        if (userDto == null) {
            // 사용자 인증 실패
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        // 닉네임이 제공된 경우에만 업데이트
        if (userNickname != null && !userNickname.trim().isEmpty()) {
            userDto.setUserNickname(userNickname);
        }

        // 이미지 파일이 제공된 경우에만 업로드 처리
        if (userImage != null && !userImage.isEmpty()) {
            String uploadedFilePath = ncpObjectStorageService.uploadFile(bucketName, folderName, userImage);

            if (uploadedFilePath != null) {
                userDto.setUserImage(uploadedFilePath);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
            }
        }

        // 업데이트된 데이터를 저장
        userDaoInter.save(userDto);

        return ResponseEntity.ok("User update success");
    }
}


