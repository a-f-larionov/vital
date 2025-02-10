package com.vital;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.vital.controllers.TikController;
import com.vital.entities.TikEntity;
import com.vital.repositories.TiksRepository;
import com.vital.utils.Asserters;
import com.vital.utils.Fixtures;

import jakarta.transaction.Transactional;

@SpringBootTest()
@Transactional
class TikTests {

	@Autowired
	TiksRepository tiksRepository;

	@Autowired
	TikController tikController;

	@Test
	void addTik() {
		// given
		var rqDto = Fixtures.buildTikDto();

		// when
		tikController.tikAdd(rqDto);

		// then
		TikEntity entity = tiksRepository.findByUidAndId(rqDto.getUid(), rqDto.getId());
		Asserters.assertTaskEntityToDTo(rqDto, entity);
	}

}
