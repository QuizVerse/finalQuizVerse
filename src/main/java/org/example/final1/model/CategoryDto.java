package org.example.final1.model;


import jakarta.persistence.*;

@Entity
@Table(name="tb_categroy")
public class CategoryDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "category_name", nullable = false, length = 50)
    private String categoryName;

}
