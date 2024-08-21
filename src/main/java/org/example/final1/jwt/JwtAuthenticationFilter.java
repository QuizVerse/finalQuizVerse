package org.example.final1.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.final1.config.auth.PrincipalDetails;
import org.example.final1.model.UserDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.BufferedReader;
import java.io.IOException;




//스프링 시큐리티에서 UsernamePasswordAuthenticationFilter이 필터가 있는데
// /account/login 요청해서 username,password전송하면(post)
// usernamepasswordauthenticationfilter동작을 한다.

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;


    // /account/login 요청을 하면 로그인 시도를 위해서 실행되는 함수
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        System.out.println("JwtAuthenticationFilter: 로그인 시도중");
        //1.username,password를 받아서
        try {
            /*if (request.getInputStream() == null || request.getInputStream().available() == 0) {
                throw new RuntimeException("Request input is empty or invalid");
            }*/
            /*
             * BufferedReader br=request.getReader(); String input=null;
             * while((input=br.readLine())!=null) { System.out.println(input); }
             */
            //System.out.println(request.getInputStream().toString());
            //getInputStream():username과 패스워드가 담아져있다.
            //->이것보다 쉬운 방법이 있음

            ObjectMapper om=new ObjectMapper();
            UserDto userDto=om.readValue(request.getInputStream(), UserDto.class);
            //json 데이터를 dto에 파싱해서 넣어주는 objectmapper
            System.out.println(userDto);

            UsernamePasswordAuthenticationToken authenticationToken=
                    new UsernamePasswordAuthenticationToken(userDto.getUser_email(), userDto.getUser_password());
            //PrincipalDetailsService에서 loaduserbyname실행된 후 정상이면 authentication이 리턴이된다.
            //db에 있는 username과 password가 일치한다.
            Authentication authentication=authenticationManager.authenticate(authenticationToken);
            //print되면 로그인되었다는 뜻
            PrincipalDetails principalDetails=(PrincipalDetails)authentication.getPrincipal();
            System.out.println("로그인완료됨 "+principalDetails.getUserDto().getUser_email());//로그인 정상적으로 됨

            //authentication 객체가 session영역에 저장을 해야하고 그방법이 return해주면됨
            //리턴의 이유는 권한 관리를 security가 대신 해주기 때문에 편하려고 하는거임
            //굳이 jwt토큰을 사용하면서 세션을 만들이유가 없음 근데 단지 권한 처리때문에 session에 넣어줌
            return authentication;

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        //2.정상인지 로그인 시도를 해본다. authenticationManager로 로그인시도를 하면 principaldetailsservice호출
        //3.principaldetails를 세션에 담고(굳이 여기 세션에 담는 이유는 권한관리를 위해서!)
        //4. jwt토큰을 만들어서 응답해주면됨.

        return null;
    }
}
