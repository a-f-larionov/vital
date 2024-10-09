ALTER TABLE task_entity
ADD COLUMN created TIMESTAMP without time zone;

alter table tik_entity
add COLUMN is_archived BOOLEAN not null default false;