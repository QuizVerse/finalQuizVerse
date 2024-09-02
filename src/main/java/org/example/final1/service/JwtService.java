package org.example.final1.service;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.example.final1.jwt.JwtTokenProvider;
import org.example.final1.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    public UserDto getUserFromJwt(HttpServletRequest request) {
        String jwtToken=extractJwtToken(request);
        if (jwtToken != null && jwtTokenProvider.validateToken(jwtToken)) {
            int userId = jwtTokenProvider.getUserId(jwtToken);
            return userService.getUserById(userId);
        }

        return null;


    }



   private String extractJwtToken(HttpServletRequest request) {
       String authorizationHeader=request.getHeader("Authorization");
       if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
           return authorizationHeader.replace("Bearer ","");
       }

       Cookie[] cookies=request.getCookies();
       if(cookies!=null) {
           for(Cookie cookie:cookies) {
               if("jwtToken".equals(cookie.getName())) {
                   return cookie.getValue();
               }
           }
       }

       return null;

   }

}
