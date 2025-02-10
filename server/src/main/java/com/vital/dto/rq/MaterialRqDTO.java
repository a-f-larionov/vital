package com.vital.dto.rq;

import java.time.Instant;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class MaterialRqDTO {

    @NotBlank
    private String id;

    @NotBlank
    private String uid;

    @NotBlank
    private String title;

    private Instant created;

    private Instant finished;
}
