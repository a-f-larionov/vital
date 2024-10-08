package com.vital.dto.rq;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class TaskArchiveDTO {

    @NotBlank
    private String uid;

    @Size(min = 36)
    private String id;
}
