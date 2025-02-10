package com.vital.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
@Entity
public class TikEntity {

    @Size(min = 36, max = 36)
    @Id
    private String id;

    @Size(min = 36, max = 36)
    @NotBlank
    private String uid;

    @Size(min = 36, max = 36)
    @NotBlank
    private String tid;

    @Size(min = 36, max = 36)
    @NotBlank
    private String mid; // renamte to metric[A]Id

    //

    private Long value;

    @NotNull
    private Instant datetime;

    @Builder.Default
    private Boolean isArchived = false;
}
