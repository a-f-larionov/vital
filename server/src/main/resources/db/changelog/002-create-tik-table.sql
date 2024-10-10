CREATE TABLE tik_entity (
    id varchar(36) NOT NULL UNIQUE,
    uid VARCHAR(36) NOT NULL,
    tid varchar(36) NOT NULL,
    oid varchar(36),

    is_archived BOOLEAN not null default false,
    
    datetime timestamp without time zone,

    m1 bigint,
    m2 bigint,
    m3 bigint,
    m4 bigint,
    
    PRIMARY KEY (id)
);