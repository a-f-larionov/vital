package com.vital.utils;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.within;

import java.time.temporal.ChronoUnit;

import com.vital.dto.MetricaDTO;
import com.vital.dto.TikDTO;
import com.vital.dto.rq.MaterialRqDTO;
import com.vital.dto.rq.TaskRqDTO;
import com.vital.dto.rs.MaterialRsDTO;
import com.vital.dto.rs.TaskRsDTO;
import com.vital.entities.MaterialEntity;
import com.vital.entities.MetricaEntity;
import com.vital.entities.TaskEntity;
import com.vital.entities.TikEntity;

public class Asserters {

    public static void assertTaskEntityToDTo(TikDTO rqDto, TikEntity entity) {
        assertThat(rqDto.getId()).isEqualTo(entity.getId());
        assertThat(rqDto.getUid()).isEqualTo(entity.getUid());
        assertThat(rqDto.getMid()).isEqualTo(entity.getMid());
        assertThat(rqDto.getTid()).isEqualTo(entity.getTid());
        assertThat(rqDto.getDatetime()).isEqualTo(entity.getDatetime());
        assertThat(rqDto.getValue()).isEqualTo(entity.getValue());
    }

    public static void assertTaskEntityToDTo(TaskRqDTO rqDto, TaskEntity entity) {
        assertThat(entity.getId()).isEqualTo(rqDto.getId());
        assertThat(entity.getUid()).isEqualTo(rqDto.getUid());
        assertThat(entity.getTitle()).isEqualTo(rqDto.getTitle());
        assertThat(entity.getIsArchived()).isFalse();
        assertThat(entity.getCreated()).isCloseTo(rqDto.getCreated(), within(1,ChronoUnit.SECONDS));
    }

    public static void assertMetricEntityToDto(MetricaEntity metric, MetricaDTO metricDto) {
        assertThat(metric.getId()).isEqualTo(metricDto.getId());
        assertThat(metric.getSort()).isEqualTo(metricDto.getSort());
        assertThat(metric.getTask().getId()).isEqualTo(metricDto.getTaskId());
        assertThat(metric.getTitle()).isEqualTo(metricDto.getTitle());
        assertThat(metric.getShortTitle()).isEqualTo(metricDto.getShortTitle());
        assertThat(metric.getIcon()).isEqualTo(metricDto.getIcon());
        assertThat(metric.getTypeCode()).isEqualTo(metricDto.getTypeCode());
        assertThat(metric.getInputCode()).isEqualTo(metricDto.getInputCode());
        assertThat(metric.getViewCode()).isEqualTo(metricDto.getViewCode());
        assertThat(metric.getTemplateId()).isEqualTo(metricDto.getTemplateId());
    }

    public static void assertTaskRqDTOAndTaskEntity(TaskRsDTO taskRsDto, TaskEntity taskEntity) {
        assertThat(taskRsDto.getId()).isEqualTo(taskEntity.getId());
        assertThat(taskRsDto.getUid()).isEqualTo(taskEntity.getUid());
        assertThat(taskRsDto.getTitle()).isEqualTo(taskEntity.getTitle());
        assertThat(taskRsDto.getTikLastUpdate()).isEqualTo(taskEntity.getTikLastUpdate());
        assertThat(taskRsDto.getSortToBottom()).isEqualTo(taskEntity.getSortToBottom());
        assertThat(taskRsDto.getCreated()).isEqualTo(taskEntity.getCreated());
        assertThat(false).isEqualTo(taskEntity.getIsArchived());

    }

    public static void assertEquals(TikDTO tikRsDto, TikEntity tikEntity) {
        assertThat(tikRsDto.getId()).isEqualTo(tikEntity.getId());
        assertThat(tikRsDto.getUid()).isEqualTo(tikEntity.getUid());
        assertThat(tikRsDto.getTid()).isEqualTo(tikEntity.getTid());
        assertThat(tikRsDto.getMid()).isEqualTo(tikEntity.getMid());
        assertThat(tikRsDto.getValue()).isEqualTo(tikEntity.getValue());
        assertThat(tikRsDto.getDatetime()).isEqualTo(tikEntity.getDatetime());
        assertThat(false).isEqualTo(tikEntity.getIsArchived());

    }

    public static void assertEquals(MaterialRqDTO materialRqDTO, MaterialEntity materialEntity) {

        assertThat(materialRqDTO.getId()).isEqualTo(materialEntity.getId());
        assertThat(materialRqDTO.getUid()).isEqualTo(materialEntity.getUid());
        assertThat(materialRqDTO.getTitle()).isEqualTo(materialEntity.getTitle());
        assertThat(materialRqDTO.getCreated()).isEqualTo(materialEntity.getCreated());
        assertThat(materialRqDTO.getFinished()).isEqualTo(materialEntity.getFinished());
    }

    public static void assertEquals(MaterialRqDTO materialRqDTO, MaterialRsDTO materialRsDTO) {

        assertThat(materialRqDTO.getId()).isEqualTo(materialRsDTO.getId());
        assertThat(materialRqDTO.getUid()).isEqualTo(materialRsDTO.getUid());
        assertThat(materialRqDTO.getTitle()).isEqualTo(materialRsDTO.getTitle());
        assertThat(materialRqDTO.getCreated()).isEqualTo(materialRsDTO.getCreated());
        assertThat(materialRqDTO.getFinished()).isEqualTo(materialRsDTO.getFinished());
    }
}
