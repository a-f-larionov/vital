package com.vital;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.vital.controllers.TaskController;
import com.vital.dto.MetricaDTO;
import com.vital.dto.rq.TaskRqDTO;
import com.vital.entities.MetricaEntity;
import com.vital.entities.TaskEntity;
import com.vital.repositories.TaskRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
class TaskTests {

	@Autowired
	TaskRepository taskRepository;

	@Autowired
	TaskController taskController;

	@Test
	void addTask() {
		// given
		var rqDto = buildRqDto();

		// when
		taskController.add(rqDto);

		// then
		TaskEntity entity = taskRepository.findByUidAndId(rqDto.getUid(), rqDto.getId());
		assertTaskEntityToDTo(rqDto, entity);
		assertThat(entity.metrics).isNull();
	}

	@Test
	void addTaskWithMetrics() {
		// given
		var rqDto = buildRqDto();
		var metricDto = buildMetricDto(rqDto.getId());
		rqDto.setMetrics(List.of(metricDto));

		// when
		taskController.add(rqDto);

		// then
		TaskEntity taskEntity = taskRepository.findByUidAndId(rqDto.getUid(), rqDto.getId());
		assertThat(taskEntity.metrics).hasSize(1);
		var metric = taskEntity.metrics.stream().findFirst().orElse(null);
		assertMetricEntityToDto(metric, metricDto);
		assertThat(metric.getTiks()).isNull();
	}

	@Test
	void updateTask() {
		// given
		var rqDto = buildRqDto();
		taskController.add(rqDto);

		// when
		rqDto.setTitle(rqDto.getTitle() + "updated");
		taskController.update(rqDto);

		// then
		TaskEntity entity = taskRepository.findByUidAndId(rqDto.getUid(), rqDto.getId());
		assertTaskEntityToDTo(rqDto, entity);
		assertThat(entity.metrics).isNull();
	}

	@Test
	void updateTaskWithMetrics() {
		// given
		var rqDto = buildRqDto();
		var metricDtoUpdated = buildMetricDto(rqDto.getId());
		rqDto.setMetrics(List.of(metricDtoUpdated));
		taskController.add(rqDto);

		// when
		rqDto.setTitle(rqDto.getTitle() + "-updated");
		metricDtoUpdated = buildMetricDto(rqDto.getId(), metricDtoUpdated.getId());
		rqDto.setMetrics(List.of(metricDtoUpdated));
		taskController.update(rqDto);

		// then
		TaskEntity taskEntity = taskRepository.findByUidAndId(rqDto.getUid(), rqDto.getId());
		assertThat(taskEntity.metrics).hasSize(1);
		var metricActual = taskEntity.metrics.getFirst();
		assertMetricEntityToDto(metricActual, metricDtoUpdated);
		assertThat(metricActual.getTiks()).isNull();
	}

	@Test
	void removeOneMetric() {
		// given
		var rqDto = buildRqDto();
		var metric1 = buildMetricDto(rqDto.getId());
		var metric2 = buildMetricDto(rqDto.getId());
		rqDto.setMetrics(List.of(metric1, metric2));
		taskController.add(rqDto);

		// when
		var metric3 = buildMetricDto(rqDto.getId(), metric1.getId());
		rqDto.setMetrics(List.of(metric3));
		taskController.update(rqDto);

		// then
		TaskEntity taskEntity = taskRepository.findByUidAndId(rqDto.getUid(), rqDto.getId());
		assertThat(taskEntity.metrics).hasSize(1);
		var metricActual = taskEntity.metrics.getFirst();
		assertMetricEntityToDto(metricActual, metric3);
		assertThat(metricActual.getTiks()).isNull();
	}

	private void assertMetricEntityToDto(MetricaEntity metric, MetricaDTO metricDto) {
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

	private MetricaDTO buildMetricDto(String taskId) {
		var metricId = UUID.randomUUID().toString();
		return buildMetricDto(taskId, metricId);
	}

	private MetricaDTO buildMetricDto(String taskId, String metricId) {
		var rnd = UUID.randomUUID().toString().substring(0, 2);
		// @todo string random
		return MetricaDTO.builder()
				.id(metricId)
				.sort(100L)
				.taskId(taskId)
				.title("title" + rnd)
				.shortTitle("shortTitle" + rnd)
				.icon("icon" + rnd)
				.typeCode("typeCode" + rnd)
				.inputCode("inputCode" + rnd)
				.viewCode("viewCode" + rnd)
				.templateId(UUID.randomUUID().toString())
				.build();
	}

	private void assertTaskEntityToDTo(TaskRqDTO rqDto, TaskEntity entity) {
		assertThat(entity.getId()).isEqualTo(rqDto.getId());
		assertThat(entity.getUid()).isEqualTo(rqDto.getUid());
		assertThat(entity.getTitle()).isEqualTo(rqDto.getTitle());
		assertThat(entity.getIsArchived()).isFalse();
		assertThat(entity.getCreated()).isEqualTo(rqDto.getCreated());
	}

	private TaskRqDTO buildRqDto() {
		return TaskRqDTO.builder()
				.id(UUID.randomUUID().toString())
				.sortToBottom(false)
				.uid(UUID.randomUUID().toString())
				.title("title-001" + UUID.randomUUID().toString())
				.created(Instant.now().minus(10, ChronoUnit.DAYS))
				.build();
	}

}
