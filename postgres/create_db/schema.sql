-- Table: users

-- DROP TABLE users;

CREATE TABLE users
(
  id bigserial NOT NULL,
  fname character(50),
  lname character(50),
  email character(50),
  CONSTRAINT pk_id PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE users
  OWNER TO udo;