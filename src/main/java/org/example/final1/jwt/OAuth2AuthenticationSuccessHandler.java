package org.example.final1.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.final1.config.auth.PrincipalDetails;
import org.example.final1.model.UserDto;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Date;


public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalDetails principalDetails=(PrincipalDetails) authentication.getPrincipal();
        UserDto userDto=principalDetails.getUserDto();

        String jwtToken = JWT.create()
                .withSubject(userDto.getUserEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .withClaim("user_id", userDto.getUserId())
                .withClaim("user_email", userDto.getUserEmail())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);


        // Create the JWT cookie
        Cookie jwtCookie = new Cookie("jwtToken", jwtToken);
        jwtCookie.setHttpOnly(false); // Prevents JavaScript access (XSS protection)
        jwtCookie.setSecure(true); // Ensure the cookie is sent over HTTPS only (set this in production)
        jwtCookie.setPath("/"); // Cookie is accessible throughout the application
        jwtCookie.setMaxAge(7 * 24 * 60 * 60); // Set the cookie to expire in 7 days



        // Create Refresh Token
        String refreshToken = JWT.create()
                .withSubject(userDto.getUserEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.REFRESH_EXPIRATION_TIME))
                .withClaim("user_id", userDto.getUserId())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        // Create the Refresh Token cookie
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(false); // Prevents JavaScript access (consider changing to true for security)
        refreshTokenCookie.setSecure(true); // Ensure the cookie is sent over HTTPS only
        refreshTokenCookie.setPath("/"); // Cookie is accessible throughout the application
        refreshTokenCookie.setMaxAge(30 * 24 * 60 * 60); // Set the cookie to expire in 30 days
        response.addCookie(refreshTokenCookie);



        // Add the cookie to the response
        response.addCookie(jwtCookie);

        // Redirect to the frontend application
        response.sendRedirect("http://localhost:3000/");


    }
}
