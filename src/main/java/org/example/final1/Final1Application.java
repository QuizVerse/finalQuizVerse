package org.example.final1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
// Spring Security를 사용하지 않을 때, 비활성화 해둘 수 있는 코드
// 사용할때 @SpringBootApplication 로 변경
public class Final1Application {

    public static void main(String[] args) {
        SpringApplication.run(Final1Application.class, args);
    }

}
