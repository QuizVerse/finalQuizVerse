package org.example.final1.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
public class BookWrongInfoDto {
    private int bookId;
    private String bookImage;
    private String bookTitle;
    private String userNickname;
    private Timestamp bookCreatedate;
    private long wrongCount;  // 틀린 문항 수
}
