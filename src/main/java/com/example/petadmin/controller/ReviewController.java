package com.example.petadmin.controller;

import com.example.petadmin.entity.ReviewEntity;
import com.example.petadmin.service.ReviewService;
import com.example.petadmin.util.Header;
import com.example.petadmin.util.Search;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/review")
@RestController
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/list")
    Header<List<ReviewEntity>> getReviewList(@RequestParam(name = "page", defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "10") int size, Search search) {
        return reviewService.getReviewList(page, size, search);
    }
}