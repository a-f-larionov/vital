package com.vital.dto.rq;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentRqDTO {

    @NotBlank
    private String id;
    
    @NotBlank
    private String uid;

    @NotBlank
    private String taskId;

    @NotBlank
    private String tikId;

    @CreationTimestamp
    private Instant created;
    
    @NotBlank
    private String text;
}
