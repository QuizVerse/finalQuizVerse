package org.example.final1.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookResponseDto {
    private int bookId;
    private String bookImage;
    private String bookTitle;
    private String bookDescription;
    private short bookStatus;
    private int bookTimer;
    private Timestamp bookCreatedate; // 책 생성 날짜 추가
    private boolean bookIspublished;
    private int bookTotalscore; // 총점 추가
    private String userNickname;
    private String categoryName;
    private UserDto user;  // 사용자 닉네임 추가
    private CategoryDto category;  // 카테고리명 추가
    private ClassDto class1;  // 클래스 이름 추가
    private boolean isBookmark;
    private int bookmarkCount;
    private int bookSectionCount;
    private int bookQuestionCount;
}
