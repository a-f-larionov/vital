package com.vital;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.vital.controllers.TikController;
import com.vital.dto.TikDTO;
import com.vital.entities.TikEntity;
import com.vital.repositories.TiksRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
@Transactional
class TikTests {

	@Autowired
	TiksRepository tiksRepository;

	@Autowired
	TikController tikController;

	@Test
	void addTask() {
		// given
		var rqDto = buildRqDto();

		// when
		tikController.tikAdd(rqDto);

		// then
		TikEntity entity = tiksRepository.findByUidAndId(rqDto.getUid(), rqDto.getId());
		
		 assertTaskEntityToDTo(rqDto, entity);
	}

	private void assertTaskEntityToDTo(TikDTO rqDto, TikEntity entity) {
		assertThat(rqDto.getId()).isEqualTo(entity.getId());
		assertThat(rqDto.getUid()).isEqualTo(entity.getUid());
		assertThat(rqDto.getMid()).isEqualTo(entity.getMid());
		assertThat(rqDto.getTid()).isEqualTo(entity.getTid());
		assertThat(rqDto.getOid()).isEqualTo(entity.getOid());
		assertThat(rqDto.getDatetime()).isEqualTo(entity.getDatetime());
		assertThat(rqDto.getValue()).isEqualTo(entity.getValue());
	}

	private TikDTO buildRqDto() {
		return TikDTO.builder()
				.id(UUID.randomUUID().toString())
				.uid(UUID.randomUUID().toString())
				.mid(UUID.randomUUID().toString())
				.tid(UUID.randomUUID().toString())
				.oid(UUID.randomUUID().toString())
				.datetime(Instant.now().minus(10, ChronoUnit.DAYS))
				.value((new Random()).nextLong())
				.build();
	}

}
