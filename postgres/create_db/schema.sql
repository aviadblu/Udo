
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
  
  
  
-- Table: tasks

-- DROP TABLE tasks;

CREATE TABLE tasks
(
  id bigserial NOT NULL,
  user_id integer,
  status character varying(50),
  location_name character varying(100),
  location_latitude character varying(20),
  location_longitude character varying(50),
  field character varying(50),
  description text,
  pricing_calc character varying(20),
  pricing_method character varying(20),
  pricing_rate character varying(10),
  "time" character varying(20),
  CONSTRAINT pk_task_id PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE tasks
  OWNER TO udo;