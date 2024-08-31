package org.example.final1.controller.mypage;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.final1.model.ClassDto;
import org.example.final1.model.ClassmemberDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.ClassRepository;
import org.example.final1.repository.ClassmemberRepository;
import org.example.final1.service.ClassService;
import org.example.final1.service.ClassmemberService;
import org.example.final1.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/myclass")
public class MyclassController {

    private final ClassService classService;
    private final JwtService jwtService;
    private final ClassmemberService classmemberService;
    private final ClassmemberRepository classmemberRepository;
    private final ClassRepository classRepository;

    @PostMapping("/newclass")
    public ResponseEntity<ClassDto> insertClass(@RequestBody ClassDto dto, HttpServletRequest request) {
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto != null) {
            dto.setUser(userDto);
            ClassDto savedClass = classService.saveClass(dto);

            ClassmemberDto classmemberDto = ClassmemberDto.builder()
                    .classmemberRole((short) 1)
                    .classmemberDate(new Timestamp(System.currentTimeMillis()))
                    .class1(savedClass)
                    .user(userDto)
                    .build();

            classmemberRepository.save(classmemberDto);


            return ResponseEntity.ok(savedClass);

        } else {
            throw new RuntimeException("Invalid or missing JWT token");

        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<ClassDto>> getAllClass() {
        List<ClassDto> list = classService.getAllClass();
        return ResponseEntity.ok(list);
    }


    @GetMapping("/index")
    public ResponseEntity<List<Map<String, Object>>> getAllClass(HttpServletRequest request) {
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto != null) {
            // 로그인 한 유저가 속한 클래스 ID 목록을 가져옴
            List<Integer> classIds = classmemberRepository.findClassIdsByUserId(userDto.getUserId());

            // 해당 클래스 ID들에 대한 ClassDto 목록을 가져옴
            List<ClassDto> classes = classRepository.findAllById(classIds);

            // 결과를 담을 리스트 초기화
            List<Map<String, Object>> classInfoList = new ArrayList<>();

            for (ClassDto classDto : classes) {
                // 해당 클래스에 속한 모든 구성원 리스트 가져오기
                List<ClassmemberDto> members = classmemberRepository.findByClass1_ClassId(classDto.getClassId())
                        .orElse(Collections.emptyList());

                // 구성원 수 계산
                int memberCount = members.size();

                // 현재 로그인한 유저의 해당 클래스에 대한 ClassmemberDto 가져오기
                ClassmemberDto memberInfo = classmemberRepository.findByClass1_ClassIdAndUser_UserId(classDto.getClassId(), userDto.getUserId())
                        .orElse(null);
                if (memberInfo != null) {
                    // 가입 날짜와 역할 가져오기
                    Timestamp joinDate = memberInfo.getClassmemberDate();
                    short memberRole = memberInfo.getClassmemberRole();

                    // 각 클래스의 정보를 담을 맵 생성
                    Map<String, Object> classInfo = new HashMap<>();


                    classInfo.put("classId",classDto.getClassId());
                    classInfo.put("className", classDto.getClassName());
                    classInfo.put("memberCount", memberCount);

                    SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
                    String formattedDate = isoFormat.format(classDto.getClassCreatedate());

                    classInfo.put("formattedDate", formattedDate);
                    System.out.println( classDto.getClassCreatedate());
                    classInfo.put("joinDate", joinDate);
                    classInfo.put("memberRole", memberRole);

                    // 결과 리스트에 추가
                    classInfoList.add(classInfo);
                }
            }

            // 최종 결과를 ResponseEntity로 반환
            return ResponseEntity.ok(classInfoList);
        } else {
            throw new RuntimeException("Invalid or missing JWT token");
        }
    }

    @PostMapping("/invite")
    public ResponseEntity<String> inviteMember(@RequestParam("userId") Integer userId,
                                               @RequestParam("classId") Integer classId) {

        System.out.println(userId + ", " + classId);
        if (userId == null || classId == null) {
            return ResponseEntity.badRequest().body("userId and classId are required.");
        }

        boolean isInvited = classmemberService.inviteMember(userId, classId);
        if (isInvited) {
            return ResponseEntity.ok("User successfully invited.");
        } else {
            return ResponseEntity.badRequest().body("Failed to invite user.");
        }
    }

    @GetMapping("/{classId}/members")
    public ResponseEntity<List<ClassmemberDto>> getClassMembers(@PathVariable Integer classId) {
        List<ClassmemberDto> members = classmemberService.getClassMembers(classId);
        return ResponseEntity.ok(members);
    }

    @PostMapping("/delete/members")
    public ResponseEntity<String> deleteMembers(@RequestBody List<Integer> ids) {
        classmemberRepository.deleteAllById(ids);
        return ResponseEntity.ok("Members deleted successfully");
    }




}
