package com.vital.dto.rs;

import java.time.Instant;
import java.util.List;

import com.vital.dto.MetricaDTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class TaskRsDTO {

    private String uid;

    private String id;

    private String title = "";

    private Instant created;

    private Instant tikLastUpdate;

    private Boolean sortToBottom;

    private List<MetricaDTO> metrics;
}
