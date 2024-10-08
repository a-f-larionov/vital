CREATE TABLE user_entity(
    id VARCHAR(255) not null,
    google_email VARCHAR(255),
    picture VARCHAR(2048),
    created  TIMESTAMP without time zone,
    primary key(id)
)
