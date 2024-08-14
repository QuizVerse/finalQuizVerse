package org.example.final1.config.auth;

//시큐리티가 account/login 경로로 가면 낚아채서 절차대로 로그인을 진행시켜준다.
//로그인이 진행이 완료가 되면 시큐리티가 가지고 있는 session을 만들어준다.
//(Security ContextHolder키값에 세션 정보  저장)
//security contextholder에는 authentication 타입 객체 오브젝트가 있어야한다.
//authentication 안에는 user정보가 있어야됨
//user 오브젝트의 type은 userdetails타입 객체임
//쉽게말하면, 시큐리티 세션영역에는 세션 정보를 authentication 객체로 저장되어줘야함.
//authentication 객체는 userdetails타입 객체
//Security Session=>Authentication=>UserDetails

import org.example.final1.model.UserDto;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class PrincipalDetails implements UserDetails {

    private UserDto userDto;//콤포지션

    public PrincipalDetails(UserDto userDto) {
        this.userDto = userDto;
    }

    //해당 유저의 권한을 리턴하는 곳
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect=new ArrayList<>();
        collect.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return userDto.getUser_role();
            }
        });

        return collect;
    }

    @Override
    public String getPassword() {
        return userDto.getUser_password();
    }

    @Override
    public String getUsername() {
        return userDto.getUser_nickname();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
