CREATE TABLE material_entity(
    id varchar(36) NOT NULL UNIQUE,
    uid varchar(36) NOT NULL,
    title varchar(127),
    created TIMESTAMP without time zone,
    finished TIMESTAMP without time zone,
    PRIMARY KEY(id)
)