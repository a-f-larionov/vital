package com.vital.utils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Random;
import java.util.UUID;

import com.vital.dto.MetricaDTO;
import com.vital.dto.TikDTO;
import com.vital.dto.rq.MaterialRqDTO;
import com.vital.dto.rq.TaskRqDTO;
import com.vital.entities.MetricaEntity;
import com.vital.entities.TaskEntity;
import com.vital.entities.TikEntity;

public class Fixtures {

	public static TaskEntity buildTaskEntity(String uid) {
		return TaskEntity.builder()
				.id(UUID.randomUUID().toString())
				.uid(uid)
				.title("title-" + Counter.nextString())
				.tikLastUpdate(Instant.now())
				.sortToBottom(false)
				.metrics(null)
				.created(Instant.now())
				.isArchived(false)
				.build();
	}

	public static TaskRqDTO buildTaskRqDto() {
		return TaskRqDTO.builder()
				.id(UUID.randomUUID().toString())
				.sortToBottom(false)
				.uid(UUID.randomUUID().toString())
				.title("title-" + Counter.nextString())
				.created(Instant.now().minus(10, ChronoUnit.DAYS))
				.build();
	}

	public static MetricaDTO buildMetricDto(String taskId) {
		var metricId = UUID.randomUUID().toString();
		return buildMetricDto(taskId, metricId);
	}

	public static MetricaDTO buildMetricDto(String taskId, String metricId) {
		return MetricaDTO.builder()
				.id(metricId)
				.sort(100L)
				.taskId(taskId)
				.title(Counter.nextString("title"))
				.shortTitle(Counter.nextString("shortTitle"))
				.icon(Counter.nextString("icon"))
				.typeCode(Counter.nextString("typeCode"))
				.inputCode(Counter.nextString("inputCode"))
				.viewCode(Counter.nextString("viewCode"))
				.templateId(UUID.randomUUID().toString())
				.build();
	}

	public static MetricaEntity buildMetricaEntity(String uid, TaskEntity taskEntity) {
		return MetricaEntity.builder()
				.id(UUID.randomUUID().toString())
				.task(taskEntity)
				.sort(123L)
				.title(Counter.nextString("title"))
				.shortTitle(Counter.nextString("short"))
				.icon(Counter.nextString("icon"))
				.typeCode(Counter.nextString("typeCode"))
				.inputCode(Counter.nextString("inputCode"))
				.viewCode(Counter.nextString("viewCode"))
				.templateId(Counter.nextString("templateId"))
				.build();
	}

	public static TikDTO buildTikDto() {
		return TikDTO.builder()
				.id(UUID.randomUUID().toString())
				.uid(UUID.randomUUID().toString())
				.mid(UUID.randomUUID().toString())
				.tid(UUID.randomUUID().toString())
				.datetime(Instant.now().minus(10, ChronoUnit.DAYS))
				.value((new Random()).nextLong())
				.build();
	}

	public static TikEntity buildTikEntity(String uid, String taskId, String metricId) {
		return TikEntity.builder()
		.id(UUID.randomUUID().toString())
		.uid(uid)
		.tid(taskId)
		.mid(metricId)
		.value(Counter.nextLong())
		.datetime(Instant.now())
		.isArchived(false)
		.build();
	}

    public static MaterialRqDTO buildMaterialRqDto() {
        return MaterialRqDTO.builder()
                .id(UUID.randomUUID().toString())
                .uid(UUID.randomUUID().toString())
                .title("title-001" + UUID.randomUUID())
                .created(Instant.now().truncatedTo(ChronoUnit.SECONDS))
                .build();
    }

	public static void modifyFields(MaterialRqDTO rqDto) {
		rqDto.setTitle(rqDto.getTitle() + Counter.nextString());
	}
}
