package org.example.final1.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tb_choice")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChoiceDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "choice_id")
    private int choice_id;

    @Column(name = "choice_text", nullable = false, length = 255)
    private String choice_text;

    @Column(name = "choice_image", length = 255)
    private String choice_image;

}
