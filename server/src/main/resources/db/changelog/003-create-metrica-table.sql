CREATE TABLE metrica_entity (
    id varchar(36) NOT NULL UNIQUE,
    sort INT not null default 1,

    title varchar(36) NOT NULL,
    short_title VARCHAR(36) NOT NULL,
    icon VARCHAR(36) NOT NULL,
    
    type_code VARCHAR(36) NOT NULL,
    input_code VARCHAR(36) NOT NULL,

    PRIMARY key(id)
);