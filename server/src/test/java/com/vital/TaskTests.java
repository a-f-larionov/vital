package com.vital;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.vital.controllers.TaskController;
import com.vital.dto.rq.TaskListRqDTO;
import com.vital.entities.TaskEntity;
import com.vital.repositories.TaskRepository;
import com.vital.utils.Asserters;
import com.vital.utils.Fixtures;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
@Disabled
class TaskTests {

	@Autowired
	TaskRepository taskRepository;

	@Autowired
	TaskController taskController;

	@Test
	void addTask() {
		// given
		var rqDto = Fixtures.buildTaskRqDto();

		// when
		taskController.add(rqDto);

		// then
		TaskEntity entity = taskRepository.findByUidAndId(rqDto.getUid(), rqDto.getId());
		Asserters.assertTaskEntityToDTo(rqDto, entity);
		assertThat(entity.metrics).isNull();
	}

	@Test
	void addTaskWithMetrics() {
		// given
		var rqDto = Fixtures.buildTaskRqDto();
		var metricDto = Fixtures.buildMetricDto(rqDto.getId());
		rqDto.setMetrics(List.of(metricDto));

		// when
		taskController.add(rqDto);

		// then
		TaskEntity taskEntity = taskRepository.findByUidAndId(rqDto.getUid(), rqDto.getId());
		assertThat(taskEntity.metrics).hasSize(1);
		var metric = taskEntity.metrics.stream().findFirst().orElse(null);
		Asserters.assertMetricEntityToDto(metric, metricDto);
		assertThat(metric.getTiks()).isNull();
	}

	@Test
	void updateTask() {
		// given
		var rqDto = Fixtures.buildTaskRqDto();
		taskController.add(rqDto);

		// when
		rqDto.setTitle(rqDto.getTitle() + "updated");
		taskController.update(rqDto);

		// then
		TaskEntity entity = taskRepository.findByUidAndId(rqDto.getUid(), rqDto.getId());
		Asserters.assertTaskEntityToDTo(rqDto, entity);
		assertThat(entity.metrics).isNull();
	}

	@Test
	void updateTaskWithMetrics() {
		// given
		var rqDto = Fixtures.buildTaskRqDto();
		var metricDtoUpdated = Fixtures.buildMetricDto(rqDto.getId());
		rqDto.setMetrics(List.of(metricDtoUpdated));
		taskController.add(rqDto);

		// when
		rqDto.setTitle(rqDto.getTitle() + "-updated");
		metricDtoUpdated = Fixtures.buildMetricDto(rqDto.getId(), metricDtoUpdated.getId());
		rqDto.setMetrics(List.of(metricDtoUpdated));
		taskController.update(rqDto);

		// then
		TaskEntity taskEntity = taskRepository.findByUidAndId(rqDto.getUid(), rqDto.getId());
		assertThat(taskEntity.metrics).hasSize(1);
		var metricActual = taskEntity.metrics.getFirst();
		Asserters.assertMetricEntityToDto(metricActual, metricDtoUpdated);
		assertThat(metricActual.getTiks()).isEmpty();
	}

	@Test
	void removeOneMetric() {
		// given
		var rqDto = Fixtures.buildTaskRqDto();
		var metric1 = Fixtures.buildMetricDto(rqDto.getId());
		var metric2 = Fixtures.buildMetricDto(rqDto.getId());
		rqDto.setMetrics(List.of(metric1, metric2));
		taskController.add(rqDto);

		// when
		var metric3 = Fixtures.buildMetricDto(rqDto.getId(), metric1.getId());
		rqDto.setMetrics(List.of(metric3));
		taskController.update(rqDto);

		// then
		TaskEntity taskEntity = taskRepository.findByUidAndId(rqDto.getUid(), rqDto.getId());
		assertThat(taskEntity.metrics).hasSize(1);
		var metricActual = taskEntity.metrics.getFirst();
		Asserters.assertMetricEntityToDto(metricActual, metric3);
		assertThat(metricActual.getTiks()).isNull();
	}

	@Test
	void listTaskMetric() {
		// given
		var rqDto = new TaskListRqDTO(UUID.randomUUID().toString());
		var taskEntity = Fixtures.buildTaskEntity(rqDto.getUid());
		var metricaEntity = Fixtures.buildMetricaEntity(rqDto.getUid(), taskEntity);
		var tikEntity = Fixtures.buildTikEntity(rqDto.getUid(), taskEntity.getId(), metricaEntity.getId());
		metricaEntity.setTiks(List.of(tikEntity));
		taskEntity.setMetrics(List.of(metricaEntity));
		taskRepository.save(taskEntity);

		// when
		var list = taskController.list(rqDto);

		// then
		assertThat(list).size().isEqualTo(1);
		var taskRsDto = list.get(0);
		Asserters.assertTaskRqDTOAndTaskEntity(taskRsDto, taskEntity);

		assertThat(taskRsDto.getMetrics()).size().isEqualTo(1);
		var metricaRsDo = taskRsDto.getMetrics().get(0);
		Asserters.assertMetricEntityToDto(metricaEntity, metricaRsDo);

		assertThat(metricaRsDo.getTiks()).size().isEqualTo(1);
		var tikRsDto = metricaRsDo.getTiks().get(0);
		Asserters.assertEquals(tikRsDto, tikEntity);
	}
}
