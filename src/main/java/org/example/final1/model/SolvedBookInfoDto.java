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
public class SolvedBookInfoDto {

    private int bookId;
    private String bookImage;
    private String bookTitle;
    private String bookDescription;
    private short bookStatus;
    private int bookTimer;
    private Timestamp bookCreatedate;

    private int solvedbookId;
    private boolean solvedbookIssubmitted;
    private Timestamp solvedbookStart;
    private Timestamp solvedbookEnd;
    private String solvedbookTimer;
}
