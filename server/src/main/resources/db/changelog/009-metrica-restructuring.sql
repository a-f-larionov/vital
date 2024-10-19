ALTER TABLE tik_entity ADD COLUMN mid VARCHAR(36);

ALTER TABLE metrica_entity RENAME TO metrica_template_entity;
ALTER TABLE metrica_template_entity ADD COLUMN view_code VARCHAR(36);

CREATE TABLE metrica_entity (
    id varchar(36) NOT NULL UNIQUE,
    task_id VARCHAR(36) NOT NULL,
    template_id VARCHAR(36),
    sort INT not null default 1,
    title varchar(36) NOT NULL,
    short_title VARCHAR(36),
    icon VARCHAR(36),
    type_code VARCHAR(36) NOT NULL,
    input_code VARCHAR(36) NOT NULL,
    view_code VARCHAR(36) NOT NULL,
    PRIMARY key(id) 
);


INSERT INTO
    metrica_entity (
        id,
        task_id,
        template_id,
        sort,
        title,
        short_title,
        icon,
        type_code,
        input_code,
        view_code
    ) 
select 
        gen_random_uuid (), 
        task.id, tmplt.id, tmplt.sort,
        tmplt.title, tmplt.short_title, tmplt.icon,
        tmplt.type_code, tmplt.input_code, task.v_code1
FROM task_entity  task inner join metrica_template_entity tmplt on task.m1_id  = tmplt.id;

update tik_entity set mid = (select id from metrica_entity where tik_entity.tid = metrica_entity.task_id);