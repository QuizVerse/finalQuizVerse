package org.example.final1.controller.account;


import org.example.final1.service.FinduserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/finduser")
public class FinduserController {

    @Autowired
    private FinduserService finduserService;

    @PostMapping("/finduser")
    public String findUserByEmail(@RequestParam("userEmail") String user_Email, Model model) {
        boolean exists = finduserService.existsByEmail(user_Email);
        if (exists) {
            model.addAttribute("message", "회원가입 이력이 있습니다.");
        } else {
            model.addAttribute("message", "회원가입 이력이 없습니다.");
        }
        return "/finduser/result";
    }
//    @GetMapping("/result")
//    public Map<String, Object> finduserEmail(@RequestParam("userEmail")String userEmail) {
//        boolean exist = finduserService.existsByEmail(userEmail);
//        Map<String, Object> response = new HashMap<>();
//        response.put("exist", exist);
//        response.put("message", exist ? "존재하는 이메일입니다." : "존재하지 않는 이메일입니다.");
//        return response;
//    }
//    @GetMapping("/result")
//    public Map<String, Object> finduserEmail(@RequestParam String email) {
//        boolean exist = finduserService.checkEmailExist(email);
//        Map<String, Object> response = new HashMap<>();
//        response.put("Exist", exist);
//        response.put("message", exist ? "존재하는 이메일입니다." : "존재하지 않는 이메일입니다,");
//        return response;
//    }
}
