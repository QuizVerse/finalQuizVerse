package org.example.final1.controller.mypage;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.final1.model.BookDto;
import org.example.final1.model.ClassDto;
import org.example.final1.model.ClassmemberDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.BookRepository;
import org.example.final1.repository.ClassRepository;
import org.example.final1.repository.ClassmemberRepository;
import org.example.final1.service.ClassService;
import org.example.final1.service.ClassmemberService;
import org.example.final1.service.JwtService;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
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
    private final BookRepository bookRepository;

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


                    classInfo.put("classId", classDto.getClassId());
                    classInfo.put("className", classDto.getClassName());
                    classInfo.put("memberCount", memberCount);

                    SimpleDateFormat isoFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
                    String formattedDate = isoFormat.format(classDto.getClassCreatedate());

                    classInfo.put("formattedDate", formattedDate);
                    System.out.println(classDto.getClassCreatedate());
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
        //System.out.println(ids);
        classmemberRepository.deleteAllById(ids);
        return ResponseEntity.ok("Members deleted successfully");
    }

    @GetMapping("/{classId}/leave")
    public ResponseEntity<String> leaveClass(@PathVariable Integer classId, HttpServletRequest request) {

        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto != null) {
            Integer userId = userDto.getUserId();

            Optional<ClassmemberDto> classmemberDto = classmemberRepository.findByClass1_ClassIdAndUser_UserId(classId, userId);

            if (classmemberDto.isPresent()) {
                classmemberRepository.delete(classmemberDto.get());
                return ResponseEntity.ok("success"); // 성공적으로 삭제한 경우 "success" 반환
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Class member not found"); // 해당 클래스 멤버가 없는 경우 적절한 메시지 반환
            }
        } else {
            throw new RuntimeException("Invalid or missing JWT token"); // JWT가 유효하지 않거나 누락된 경우 예외 발생
        }
    }

    @GetMapping("/{classId}/userrole")
    public ResponseEntity<Short> roleMembers(@PathVariable Integer classId, HttpServletRequest request) {
        // JWT로부터 사용자 정보를 가져옴
        UserDto userDto = jwtService.getUserFromJwt(request);

        if (userDto != null) {
            Integer userId = userDto.getUserId();

            // 특정 classId와 userId에 해당하는 클래스 멤버를 찾음
            Optional<ClassmemberDto> classmemberDto = classmemberRepository.findByClass1_ClassIdAndUser_UserId(classId, userId);

            if (classmemberDto.isPresent()) {
                // Optional에서 실제 ClassmemberDto 객체를 꺼내고 역할을 가져옴

                short role = classmemberDto.get().getClassmemberRole();
                System.out.println(role);
                return ResponseEntity.ok(role);  // 역할을 반환
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body((short)-1);  // 클래스 멤버를 찾지 못했을 경우
            }
        } else {
            throw new RuntimeException("Invalid or missing JWT token");  // JWT가 유효하지 않거나 누락된 경우
        }
    }

    @GetMapping("/{classId}/class")
    public ResponseEntity<?> className(@PathVariable Integer classId) {
        Optional<ClassDto> classDtoOptional = classRepository.findById(classId);

        if (classDtoOptional.isPresent()) {
            ClassDto classDto = classDtoOptional.get();
            // 원하는 응답을 반환 (예: classDto 객체나 다른 정보를 ResponseEntity로 반환)
            return ResponseEntity.ok(classDto); // 또는 다른 객체나 메시지를 반환
        } else {
            // 클래스가 존재하지 않는 경우 404 상태코드와 함께 메시지를 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Class not found");
        }

    }



    @GetMapping("/{classId}/books")
    public ResponseEntity<List<BookDto>> roleMembers(@PathVariable Integer classId) {
        List<BookDto> books;
        books = bookRepository.findByClass1_ClassId(classId);
        return ResponseEntity.ok(books);
    }



    @PostMapping("/{classId}/changeLeader")
    @Transactional
    public ResponseEntity<String> changeLeader(
            @PathVariable Integer classId,
            @RequestBody Map<String, Integer> request,
            HttpServletRequest httpServletRequest) {

        Integer newLeaderId = request.get("newLeaderId");
        UserDto userDto = jwtService.getUserFromJwt(httpServletRequest);

        if (userDto != null) {
            Integer userId = userDto.getUserId();

            // 현재 방장 역할을 갖고 있는 클래스 멤버를 찾음
            Optional<ClassmemberDto> currentLeaderOpt = classmemberRepository.findByClass1_ClassIdAndUser_UserId(classId, userId);

            // 새로운 방장으로 설정할 멤버를 찾음
            Optional<ClassmemberDto> newLeaderOpt = classmemberRepository.findById(newLeaderId);

            if (currentLeaderOpt.isPresent() && newLeaderOpt.isPresent()) {
                ClassmemberDto currentLeader = currentLeaderOpt.get();
                ClassmemberDto newLeader = newLeaderOpt.get();

                // 현재 리더의 역할을 멤버로 변경 (예: 2)
                currentLeader.setClassmemberRole((short) 2);
                classmemberRepository.save(currentLeader);

                // 새로운 리더의 역할을 방장으로 변경 (1)
                newLeader.setClassmemberRole((short) 1);
                classmemberRepository.save(newLeader);

                return ResponseEntity.ok("Leader changed successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Leader or new leader not found");
            }
        } else {
            throw new RuntimeException("Invalid or missing JWT token");
        }
    }
    @Transactional
    @GetMapping("/{classId}/delete")
    public ResponseEntity<String> deleteClass(@PathVariable Integer classId){
        try {
            classRepository.deleteById(classId);
            System.out.println("시작이젤무서워 미루니");
            return ResponseEntity.ok("Delete class successfully");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }




}


