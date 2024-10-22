ALTER TABLE task_entity DROP COLUMN m1_id;
ALTER TABLE task_entity DROP COLUMN v_code1;
ALTER TABLE task_entity DROP COLUMN v_code2;

ALTER TABLE tik_entity RENAME COLUMN m1 TO value;