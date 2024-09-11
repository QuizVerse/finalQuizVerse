package org.example.final1.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private boolean bookIspublished;
    private boolean isBookmark;
    private int bookmarkCount;
    private int bookSectionCount;
    private int bookQuestionCount;
}
