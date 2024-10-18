package com.vital.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ResponseDto {

    private String status;

    public ResponseDto(String status) {
        this.status = status;
    }
}
