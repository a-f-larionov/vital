package com.vital.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ResponseDTO {

    private String status;

    public ResponseDTO(String status) {
        this.status = status;
    }
}
