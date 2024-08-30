package org.example.final1.controller.mypage;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.example.final1.model.ClassDto;
import org.example.final1.model.ClassmemberDto;
import org.example.final1.model.UserDto;
import org.example.final1.service.ClassService;
import org.example.final1.service.ClassmemberService;
import org.example.final1.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/myclass")
public class MyclassController {

    private final ClassService classService;
    private final JwtService jwtService;
    private final ClassmemberService classmemberService;

    @PostMapping("/newclass")
    public ResponseEntity<ClassDto> insertClass(@RequestBody ClassDto dto,HttpServletRequest request) {
        UserDto userDto = jwtService.getUserFromJwt(request);
        if (userDto != null) {
            dto.setUser(userDto);
            ClassDto savedClass = classService.saveClass(dto);
            return ResponseEntity.ok(savedClass);

        } else {
            throw new RuntimeException("Invalid or missing JWT token");

        }
    }

    @GetMapping("/index")
    public ResponseEntity<List<ClassDto>> getAllClass(HttpServletRequest request) {
        UserDto userDto=jwtService.getUserFromJwt(request);
        if (userDto != null) {
            List<ClassDto> list = classService.getClassUser(userDto);
            return ResponseEntity.ok(list);
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



}
