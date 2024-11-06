ALTER TABLE task_entity DROP COLUMN m1_id;
ALTER TABLE task_entity DROP COLUMN v_code1;
ALTER TABLE task_entity DROP COLUMN v_code2;

ALTER TABLE tik_entity RENAME COLUMN m1 TO value;
update public.tik_entity set mid = (select MIN(id) from public.metrica_entity where tik_entity.tid = metrica_entity.task_id);