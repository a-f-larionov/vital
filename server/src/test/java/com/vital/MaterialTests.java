package com.vital;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.UUID;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.google.gson.Gson;
import com.vital.controllers.MaterialController;
import com.vital.dto.rq.MaterialListRqDto;
import com.vital.entities.MaterialEntity;
import com.vital.repositories.MaterialRepository;
import com.vital.utils.Asserters;
import com.vital.utils.Fixtures;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

//@WebMvcTest(MaterialController.class)
@AutoConfigureMockMvc
@SpringBootTest
@ActiveProfiles("test")
@Transactional
class MaterialTests {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    MaterialRepository materialRepository;

    @Autowired
    MaterialController materialController;

    @Autowired
    EntityManager entityManager;

    @Test
    @Disabled
    void addMaterial() throws Exception {
        // given
        var rqDto = Fixtures.buildMaterialRqDto();

        // when
        // - не всегда откатывает!
        // - как жить без flush and clear?

        mockMvc.perform(post("/api/materials/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new Gson().toJson(rqDto)))
                .andExpect(status().isOk());

        // mvc
        //materialController.add(rqDto);

        // then
        MaterialEntity entity = materialRepository.findById(rqDto.getId());
        Asserters.assertEquals(rqDto, entity);
    }

    @Test
    void updateMaterial() {
        // given
        var rqDto = Fixtures.buildMaterialRqDto();
        materialController.add(rqDto);

        // when
        Fixtures.modifyFields(rqDto);
        materialController.update(rqDto);

        // then
        entityManager.flush();
        entityManager.clear();
        MaterialEntity entity = materialRepository.findById(rqDto.getId());
        Asserters.assertEquals(rqDto, entity);
    }

    @Test
    void listMaterials() {
        // given
        var uid = UUID.randomUUID().toString();
        var rqDto1 = Fixtures.buildMaterialRqDto();
        var rqDto2 = Fixtures.buildMaterialRqDto();
        var rqDto3 = Fixtures.buildMaterialRqDto();
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
        Asserters.assertEquals(rqDto1, list.stream()
                .filter(rsDto -> rsDto.getId().equals(rqDto1.getId()))
                .findFirst().orElseThrow()
        );
        Asserters.assertEquals(rqDto2, list.stream()
                .filter(rsDto -> rsDto.getId().equals(rqDto2.getId()))
                .findFirst().orElseThrow()
        );
    }
}
