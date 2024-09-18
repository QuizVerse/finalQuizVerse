package org.example.final1.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "tb_solvedbook")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolvedbookDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "solvedbook_id")
    private int solvedbookId;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)  // Book이 삭제되면 관련 Solvedbook도 삭제
    @ToString.Exclude  // 순환 참조 방지
    //해당 문제집이 삭제되더라도 삭제된 문제집이라고만 뜨게 하기
    private BookDto book;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private UserDto user;

    @Column(name = "solvedbook_start")
    private Timestamp solvedbookStart;

    @Column(name = "solvedbook_end")
    private Timestamp solvedbookEnd;


    @OneToMany(mappedBy = "solvedbook")
    @JsonManagedReference  // 부모-자식 관계에서 부모로 설정 (JSON에서 직렬화됨)
    @ToString.Exclude  // 순환 참조 방지
    private List<AnswerDto> answers;

    @Column(name = "solvedbook_issubmitted", length = 100,nullable = false)
    // 새로운 필드 추가: 시험 제출 여부
    private boolean solvedbookIssubmitted;

/*    @OneToMany(mappedBy = "solvedbook", cascade = CascadeType.ALL)
    private List<WrongDto> wrongs; // 추가*/

}
