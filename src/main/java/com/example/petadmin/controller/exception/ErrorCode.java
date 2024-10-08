package com.example.petadmin.controller.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    NOTICE_NOT_FOUND(HttpStatus.NOT_FOUND,"Notice not found"),
    PET_HOSPITAL_NOT_FOUND(HttpStatus.NOT_FOUND,"Pet hospital not found"),
    DUPLICATED_USER(HttpStatus.CONFLICT, "Duplicated user"),
    DATABASE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Database error occurs"),
    ;

    private final HttpStatus status;
    private final String message;

}
