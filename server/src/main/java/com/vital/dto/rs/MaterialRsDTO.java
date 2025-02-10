package com.vital.dto.rs;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaterialRsDTO {
    
    private String id;
    
    private String uid;

    
    private String title;

    private Instant created;

    private Instant finished;
}
