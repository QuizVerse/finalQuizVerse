package org.example.final1.jwt;

//시큐리티가 filter가지고 있는데 그필터중에 BasicAuthenticationFilter 라는 것이 있음.
//권한이나 인증이 필요한 특정 주소를 요청했을때 위 필터를 무조건타게 되어있다.
//만약에 권한이 인증이 필요한 주소가 아니라면 이 필터를 안탄다.

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.final1.config.auth.PrincipalDetails;
import org.example.final1.model.UserDto;
import org.example.final1.repository.User.UserDaoInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {


    private final UserDaoInter userDaoInter;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserDaoInter userDaoInter ) {
        super(authenticationManager);


        this.userDaoInter = userDaoInter;
    }

    //인증이나 권한이 필요한 주소요청이 있을때 해당 필터를 타게됨
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        //super.doFilterInternal(request, response, chain);
        //System.out.println("인증이나 권한이 필요한 주소 요청이됨");

        String jwtHeader=request.getHeader("Authorization");

        //System.out.println("jwtHeader:"+jwtHeader);
        //header가 있는지 확인
        if(jwtHeader==null||!jwtHeader.startsWith("Bearer")) {
            chain.doFilter(request, response);
            return;
        }

        System.out.println(request.getHeader(JwtProperties.HEADER_STRING).replace("Bearer ", ""));
        //jwt토큰을 검증을해서 정상적인 사용자인지 확인
        String jwtToken=request.getHeader(JwtProperties.HEADER_STRING).replace("Bearer ", "");

        String userEmail= JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().
                verify(jwtToken).
                getClaim("userEmail").
                asString();
        //System.out.println(user_email);
        //서명이 정상적으로됨
        if(userEmail!=null) {
            UserDto userDto=userDaoInter.findByEmail(userEmail);
            System.out.println(userEmail);
            //Jwt 토큰 서명을통해서 서명이 정상이면 Authentication객체를 만들어준다.
            PrincipalDetails principalDetails=new PrincipalDetails(userDto);
            Authentication authentication=new UsernamePasswordAuthenticationToken(principalDetails, null,principalDetails.getAuthorities());

            //강제로 시큐리티의 세션에 접근하여 Authentication 객체를 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
            //System.out.println("세션에 저장"+authentication);
            chain.doFilter(request, response);
        }


    }

}
