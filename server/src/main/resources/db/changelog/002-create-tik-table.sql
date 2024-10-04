CREATE TABLE tik_entity (
    id varchar(255) NOT NULL,
    tid varchar(255) NOT NULL,
    oid varchar(255) NOT NULL,
    datetime timestamp without time zone,
    m1 bigint,
    m2 bigint,
    m3 bigint,
    m4 bigint,
    PRIMARY KEY (id)
);