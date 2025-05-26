package com.vital;

import com.vital.controllers.MaterialController;
import com.vital.dto.rq.MaterialListRqDto;
import com.vital.entities.MaterialEntity;
import com.vital.repositories.MaterialRepository;
import com.vital.utils.Fixtures;
import jakarta.persistence.EntityManager;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;

import java.util.UUID;

import static com.vital.utils.Asserters.assertEquals;
import static com.vital.utils.Fixtures.buildMaterialRqDto;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
class MaterialTests extends MockMvcBaseTest {

    @Autowired
    MaterialController materialController;

    @Autowired
    MaterialRepository materialRepository;

    @Autowired
    EntityManager entityManager;

    @Test
    @SneakyThrows
    void addMaterial() {
        var rqDto = buildMaterialRqDto();

        mockMvcPerormPost("/api/materials/add", rqDto);

        assertEquals(rqDto, materialRepository.findById(rqDto.getId()));
    }

    @Test
    @Disabled
    void updateMaterial() {
        // given
        var rqDto = buildMaterialRqDto();
        materialController.add(rqDto);

        // when
        Fixtures.modifyFields(rqDto);
        materialController.update(rqDto);

        // then
        entityManager.flush();
        entityManager.clear();
        MaterialEntity entity = materialRepository.findById(rqDto.getId());
        assertEquals(rqDto, entity);
    }

    @Test
    @Disabled
    void listMaterials() {
        // given
        var uid = UUID.randomUUID().toString();
        var rqDto1 = buildMaterialRqDto();
        var rqDto2 = buildMaterialRqDto();
        var rqDto3 = buildMaterialRqDto();
        rqDto1.setUid(uid);
        rqDto2.setUid(uid);
        var rqDto = MaterialListRqDto.builder().uid(uid).build();
        materialController.add(rqDto1);
        materialController.add(rqDto2);
        materialController.add(rqDto3);

        entityManager.flush();
        entityManager.clear();

        // when
        var list = materialController.list(rqDto);

        // then
        assertEquals(rqDto1, list.stream()
                .filter(rsDto -> rsDto.getId().equals(rqDto1.getId()))
                .findFirst().orElseThrow()
        );
        assertEquals(rqDto2, list.stream()
                .filter(rsDto -> rsDto.getId().equals(rqDto2.getId()))
                .findFirst().orElseThrow()
        );
    }
}
