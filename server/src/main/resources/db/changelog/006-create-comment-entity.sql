CREATE TABLE comment_entity(
    id varchar(36) NOT NULL UNIQUE,
    uid VARCHAR(36) not NULL,
    task_id  VARCHAR(36) NOT NULL,
    tik_id VARCHAR(36) NOT null,
    
    created TIMESTAMP without time zone,
    is_archived boolean,
    
    text VARCHAR(256) not null,

    PRIMARY key(id) 
) ;