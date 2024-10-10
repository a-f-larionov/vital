CREATE TABLE user_entity(
    id VARCHAR(36) not null UNIQUE,
    google_email VARCHAR(127),
    picture VARCHAR(2048),
    created  TIMESTAMP without time zone,

    PRIMARY KEY(id)
)
