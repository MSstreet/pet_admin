package com.example.petadmin.db;

import com.example.petadmin.entity.ReviewEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface ReviewMapper {

    List<ReviewEntity> getReviewList(HashMap<String, Object> paramMap);

    int getReviewListCount(HashMap<String, Object> paramMap);
}
