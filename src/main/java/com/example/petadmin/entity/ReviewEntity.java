package com.example.petadmin.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "review_entity")
public class ReviewEntity {

    private Long reviewIdx;
    private String content;
    private String hospitalName;
    private int effectScore;
    private int priceScore;
    private int kindnessScore;
    private float score;
    private float tmpScore;
    private int approveYn;
    private int deleteYn;
    private String fileName;
    private String originalFileName;
    private String createdBy;
    private String updatedBy;
    private String createdAt;
    private String updatedAt;

}
