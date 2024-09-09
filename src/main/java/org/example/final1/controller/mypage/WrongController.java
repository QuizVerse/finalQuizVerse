package org.example.final1.controller.mypage;


import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.example.final1.model.UserDto;
import org.example.final1.model.WrongDto;
import org.example.final1.service.JwtService;
import org.example.final1.service.WrongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@AllArgsConstructor
@Controller
public class WrongController {

    @Autowired
    private final WrongService wrongService;

    @Autowired
    private final JwtService jwtService;



    //오답노트 목록 불러오기
    @GetMapping("/wrongbook/user")
    public List<WrongDto> getWrongBooksByUserId(HttpServletRequest request) {
        UserDto userDto=jwtService.getUserFromJwt(request);
        int userId=userDto.getUserId();

        return wrongService.getWrongBooksByUserId(userId);
    }
}
