package org.example.final1.controller.account;

import java.util.HashMap;
import java.util.Map;

import org.example.final1.model.UserDto;
import org.example.final1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FinduserController {

    @Autowired
    private UserService userService;

@GetMapping("/finduser")
public Map<String, Object> emailCheck(@RequestParam("user_email") String user_email) {
    Map<String, Object> response = new HashMap<>();
    boolean exists = userService.getEmailcheck(user_email);

    response.put("exists", exists);
    response.put("message", exists ? "가입 이력이 있는 아이디입니다." : "가입 이력이 없는 아이디입니다.");

    return response;
}
    @GetMapping("/findNickname")
    public Map<String,Object> findUserByNickname(@RequestParam("nickname")String nickname){
        Map<String,Object> response=new HashMap<>();
        UserDto user=userService.findByUserNickname(nickname);

        if(user!=null){
            response.put("user",user);
            response.put("exists",true);
        }else{
            response.put("exists",false);
            response.put("message", "해당 닉네임을 가진 사용자를 찾을 수 없습니다.");
        }

        return response;
    }


}