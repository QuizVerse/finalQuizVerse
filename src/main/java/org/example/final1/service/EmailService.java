package org.example.final1.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.File;
import java.io.IOException;

@Service

public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private TemplateEngine templateEngine;

    /**
     *
     * @param to 받는 사람의 이메일 주소
     * @param authenticationCode 발송할 인증 코드
     * @throws MessagingException 이메일 생성 및 전송 예외
     * @throws IOException 리소스 로드 예외
     */
    @Async //이메일 비동기적으로 실행 ->속도 빠르게 보내짐
    public void sendVerificationEmail(String to, String authenticationCode) throws MessagingException, IOException {
        // 템플릿에 사용할 변수
        Context context = new Context();
        context.setVariable("authenticationCode", authenticationCode); // "authenticationCode"라는 변수명으로 인증 코드를 설정

        // 템플릿 엔진을 사용해 HTML 형식의 이메일 내용을 렌더링
        // "Firstemailtemplates"라는 템플릿을 사용하여 context를 적용
        String htmlContent = templateEngine.process("Firstemailtemplates", context);

        // 이메일 메시지를 생성
        MimeMessage message = emailSender.createMimeMessage();

        // 메시지를 도와주는 헬퍼 클래스->밑에 코드 보면 이해될거임!
        // true로 설정하여 멀티파트 메시지를 지원(미디어 같은거)
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        // 이메일 수신자 설정
        helper.setTo(to);

        // 이메일 제목 설정
        helper.setSubject("quiz verse 인증 번호");

        // 이메일 본문 설정 (HTML 형식)
        helper.setText(htmlContent, true);
        // CID로 이미지 추가
        FileSystemResource res = new FileSystemResource(new File("C:/Quizprj/finalQuizVerse/src/main/resources/static/logooo.png"));
        helper.addInline("quizverseLogo", res);

        // 이메일에 이미지 파일을 첨부합
       //helper.addInline("quizverseLogo", new ClassPathResource("reactjs/src/image/Quizverse.png"));

        // 이메일을 전송
        emailSender.send(message);
    }
}
