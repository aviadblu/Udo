
-- Table: session

-- DROP TABLE session;

CREATE TABLE session
(
  sid character varying NOT NULL,
  sess json NOT NULL,
  expire timestamp(6) without time zone NOT NULL,
  CONSTRAINT session_pkey PRIMARY KEY (sid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE session
  OWNER TO udo;


-- Table: users

-- DROP TABLE users;

CREATE TABLE users
(
  id bigserial NOT NULL,
  fname character varying(50),
  lname character varying(50),
  email character varying(50),
  facebook_id character varying(30),
  picture text,
  roles json,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT users_email_key UNIQUE (email)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE users
  OWNER TO udo;