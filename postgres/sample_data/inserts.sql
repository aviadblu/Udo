--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.11
-- Dumped by pg_dump version 9.5.1

-- Started on 2016-04-09 12:09:19 IDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 11753)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 1966 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 171 (class 1259 OID 24576)
-- Name: session; Type: TABLE; Schema: public; Owner: udo
--

CREATE TABLE session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE session OWNER TO udo;

--
-- TOC entry 172 (class 1259 OID 24582)
-- Name: tasks; Type: TABLE; Schema: public; Owner: udo
--

CREATE TABLE tasks (
    id bigint NOT NULL,
    user_id integer,
    status character varying(50),
    location_name character varying(100),
    location_latitude character varying(20),
    location_longitude character varying(50),
    location_fulldata json,
    field character varying(500),
    description text,
    pricing_calc character varying(20),
    pricing_method character varying(20),
    pricing_rate character varying(10),
    "time" character varying(20)
);


ALTER TABLE tasks OWNER TO udo;

--
-- TOC entry 173 (class 1259 OID 24588)
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: udo
--

CREATE SEQUENCE tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tasks_id_seq OWNER TO udo;

--
-- TOC entry 1967 (class 0 OID 0)
-- Dependencies: 173
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udo
--

ALTER SEQUENCE tasks_id_seq OWNED BY tasks.id;


--
-- TOC entry 174 (class 1259 OID 24590)
-- Name: users; Type: TABLE; Schema: public; Owner: udo
--

CREATE TABLE users (
    id bigint NOT NULL,
    fname character varying(50),
    lname character varying(50),
    email character varying(50),
    facebook_id character varying(80),
    google_id character varying(80),
    picture text,
    roles json,
    password character varying(100)
);


ALTER TABLE users OWNER TO udo;

--
-- TOC entry 175 (class 1259 OID 24596)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: udo
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO udo;

--
-- TOC entry 1968 (class 0 OID 0)
-- Dependencies: 175
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: udo
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- TOC entry 1838 (class 2604 OID 24598)
-- Name: id; Type: DEFAULT; Schema: public; Owner: udo
--

ALTER TABLE ONLY tasks ALTER COLUMN id SET DEFAULT nextval('tasks_id_seq'::regclass);


--
-- TOC entry 1839 (class 2604 OID 24599)
-- Name: id; Type: DEFAULT; Schema: public; Owner: udo
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- TOC entry 1955 (class 0 OID 24582)
-- Dependencies: 172
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: udo
--

COPY tasks (id, user_id, status, location_name, location_latitude, location_longitude, location_fulldata, field, description, pricing_calc, pricing_method, pricing_rate, "time") FROM stdin;
1	1	open	Yosef Eliyahu St, Tel Aviv-Yafo, Israel	32.075014	34.78077600000006	{"address_components":[{"long_name":"Yosef Eliyahu Street","short_name":"Yosef Eliyahu St","types":["route"]},{"long_name":"Tel Aviv-Yafo","short_name":"Tel Aviv-Yafo","types":["locality","political"]},{"long_name":"Tel Aviv District","short_name":"Tel Aviv District","types":["administrative_area_level_1","political"]},{"long_name":"Israel","short_name":"IL","types":["country","political"]}],"adr_address":"<span class=\\"street-address\\">Yosef Eliyahu St</span>, <span class=\\"locality\\">Tel Aviv-Yafo</span>, <span class=\\"country-name\\">Israel</span>","formatted_address":"Yosef Eliyahu St, Tel Aviv-Yafo, Israel","geometry":{"location":{"lat":32.075014,"lng":34.78077600000006}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png","id":"e84a784134aeb0dd1c30851cf0a5d5b03943cf04","name":"Yosef Eliyahu Street","place_id":"ChIJ_Uc0wYNLHRURe_ZIwJIbzsk","reference":"CpQBhQAAADtJuC0I7d6XI1woIraGJJYPY58P72sziPhB_fA-3cWQSKcu3pMSRWAnOFGmjg91w5IklIZqs2If7kQzer7sDTrtmx9738d-C0TFscz3WmQJgYuJwxJVBA_V8JqtoHxsJk3kajb6EEfUxN62k3wdV7jc-6totOd7dBXw9BUftEKpfGi2dUluK8h8l34TOMctlhIQqdp7NkyW7N79BS2o4Wcx9RoUZc6jpshBN3Ok3ikXI0RD_fK734A","scope":"GOOGLE","types":["route"],"url":"https://maps.google.com/?q=Yosef+Eliyahu+St,+Tel+Aviv-Yafo,+Israel&ftid=0x151d4b83c13447fd:0xc9ce1b92c048f67b","vicinity":"Tel Aviv-Yafo","html_attributions":[]}	{"id":1,"name":"Laundry","icon":"/assets/img/icons/laundry-icon.png"}	ddz	hour	paypal	12	1460191126683
2	1	open	Eliyahu Berlin St 10, Tel Aviv-Yafo, Israel	32.1246984	34.793202000000065	{"address_components":[{"long_name":"10","short_name":"10","types":["street_number"]},{"long_name":"Eliyahu Berlin Street","short_name":"Eliyahu Berlin St","types":["route"]},{"long_name":"Tel Aviv-Yafo","short_name":"Tel Aviv-Yafo","types":["locality","political"]},{"long_name":"Tel Aviv District","short_name":"Tel Aviv District","types":["administrative_area_level_1","political"]},{"long_name":"Israel","short_name":"IL","types":["country","political"]}],"adr_address":"<span class=\\"street-address\\">Eliyahu Berlin St 10</span>, <span class=\\"locality\\">Tel Aviv-Yafo</span>, <span class=\\"country-name\\">Israel</span>","formatted_address":"Eliyahu Berlin St 10, Tel Aviv-Yafo, Israel","geometry":{"access_points":[{"location":{"lat":32.1247677,"lng":34.792739},"travel_modes":["DRIVING","BICYCLING","WALKING","TRANSIT"]}],"location":{"lat":32.1246984,"lng":34.793202000000065}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png","id":"458dc8a1a82522c0ce598d720b98fbbfe119c92f","name":"Eliyahu Berlin St 10","place_id":"ChIJgwnXAUFJHRURoUZpCFDhiQY","reference":"CpQBiQAAABfkB7OM3xMDNJLjscazA0DBsLRsts6387ZxyLgAyiGLOOfjf8jKlJTf75kjBm0Ezsu9mXwqJ_a72cfN54clmlB-6RJ4G2U9mvdkHYaP5VsZfLHh7lMqh4ywWjBQtNfSjtjLCXROCIM6_KANtz0Y2oCiWpQ6KDrCJDT5fCahl_dCp1Wt7NAC-r1p-VpX4XulzRIQy7fASivODBVvkheo5aZUUBoUlrbf2wpNdeijXaumbPug1W7tCz0","scope":"GOOGLE","types":["street_address"],"url":"https://maps.google.com/?q=Eliyahu+Berlin+St+10,+Tel+Aviv-Yafo,+Israel&ftid=0x151d494101d70983:0x689e150086946a1","vicinity":"Tel Aviv-Yafo","html_attributions":[]}	{"id":2,"name":"Handyman","icon":"/assets/img/icons/handyman-icon.png"}	Some desc	pauschal	paypal	120	1460191153047
3	1	open	Rothschild Blvd 55, Tel Aviv-Yafo, Israel	32.064732	34.775647400000025	{"address_components":[{"long_name":"55","short_name":"55","types":["street_number"]},{"long_name":"Rothschild Boulevard","short_name":"Rothschild Blvd","types":["route"]},{"long_name":"Tel Aviv-Yafo","short_name":"Tel Aviv-Yafo","types":["locality","political"]},{"long_name":"Ezor Tel Aviv","short_name":"Ezor Tel Aviv","types":["administrative_area_level_3","political"]},{"long_name":"Tel Aviv District","short_name":"Tel Aviv District","types":["administrative_area_level_1","political"]},{"long_name":"Israel","short_name":"IL","types":["country","political"]}],"adr_address":"<span class=\\"street-address\\">Rothschild Blvd 55</span>, <span class=\\"locality\\">Tel Aviv-Yafo</span>, <span class=\\"country-name\\">Israel</span>","formatted_address":"Rothschild Blvd 55, Tel Aviv-Yafo, Israel","geometry":{"access_points":[{"location":{"lat":32.0646385,"lng":34.7757865},"travel_modes":["DRIVING","TRANSIT"]}],"location":{"lat":32.064732,"lng":34.775647400000025}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png","id":"f7e7a479a9af2d66b7e43a0e68960c875b25da55","name":"Rothschild Blvd 55","place_id":"ChIJv5eAEn1LHRURCrEMtS9pay8","reference":"CpQBhwAAAB9FDFAXHiQWOKl0Dh9-eFpVEh6bBQfmobHgn8_uoma-910JprT75T-y0pspsG6oGtD-x684fDnrPl5seVBUlHyMg0Zod-9ju54rPsEt3aSqhUw8_Y_ESu-A8D2SCRHy-V_Nrym1qlZsWaRjvBJ23uGDOVPcdedntazzeUdS-0MK6HV1TS_LAmS_l8DJ_t9wWhIQdq9ym-n07uRWxRMWgaPDChoU-iNj1w8p0EbWp6bQdFrgKXrj-9E","scope":"GOOGLE","types":["street_address"],"url":"https://maps.google.com/?q=Rothschild+Blvd+55,+Tel+Aviv-Yafo,+Israel&ftid=0x151d4b7d128097bf:0x2f6b692fb50cb10a","vicinity":"Tel Aviv-Yafo","html_attributions":[]}	{"id":1,"name":"Laundry","icon":"/assets/img/icons/laundry-icon.png"}	Boink Boink	hour	paypal	55	1460191183694
4	1	open	Namir Rd, Tel Aviv-Yafo, Israel	32.109816	34.79212600000005	{"address_components":[{"long_name":"Namir Road","short_name":"Namir Rd","types":["route"]},{"long_name":"Tel Aviv-Yafo","short_name":"Tel Aviv-Yafo","types":["locality","political"]},{"long_name":"Tel Aviv District","short_name":"Tel Aviv District","types":["administrative_area_level_1","political"]},{"long_name":"Israel","short_name":"IL","types":["country","political"]}],"adr_address":"<span class=\\"street-address\\">Namir Rd</span>, <span class=\\"locality\\">Tel Aviv-Yafo</span>, <span class=\\"country-name\\">Israel</span>","formatted_address":"Namir Rd, Tel Aviv-Yafo, Israel","geometry":{"location":{"lat":32.109816,"lng":34.79212600000005}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png","id":"685e5c273fb0a966036885dc05cbd9cbce0f7d91","name":"Namir Road","place_id":"ChIJf8bhm2BJHRURftu3TxFTrFE","reference":"CoQBfAAAAFwgWZip-h5r7j-IwUBuh8UeUNbB7D8FIopYujOiE_e7FgTDTcOR8AaJ3yIpaetshDYfsksw3uwUq1hq1jvkqmN_O4UGhgUBCNQWQ7Z4ggB6VxmXKtPmOjDATT-CwMHrL8OiZBkx5fXqHjhIaEElGDebYVDqiaOx6bDCcY20l4SsEhAG2Mt3pz4lgr0ANhA2FWadGhSxaSC6CuaN7c2R1dHaYm9NbYQtoQ","scope":"GOOGLE","types":["route"],"url":"https://maps.google.com/?q=Namir+Rd,+Tel+Aviv-Yafo,+Israel&ftid=0x151d49609be1c67f:0x51ac53114fb7db7e","vicinity":"Tel Aviv-Yafo","html_attributions":[]}	{"id":1,"name":"Laundry","icon":"/assets/img/icons/laundry-icon.png"}	1234	hour	paypal	12	1460191199905
6	1	open	Tel Aviv-Yafo, Israel	32.072617	34.77928900000006	{"address_components":[{"long_name":"Tel Aviv-Yafo","short_name":"Tel Aviv-Yafo","types":["locality","political"]},{"long_name":"Israel","short_name":"IL","types":["country","political"]}],"adr_address":"<span class=\\"locality\\">Tel Aviv-Yafo</span>, <span class=\\"country-name\\">Israel</span>","formatted_address":"Tel Aviv-Yafo, Israel","geometry":{"location":{"lat":32.072617,"lng":34.77928900000006}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png","id":"80c97755430417fa8a455137bb34dd06332608ef","name":"Habima Square","photos":[{"height":2448,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/100241716155611512234/photos\\">Micah Jesse</a>"],"width":3264},{"height":551,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/100353650879428936664/photos\\">Tamás Protovin</a>"],"width":980},{"height":584,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/105801743711073975336/photos\\">Ofir Rozenberg</a>"],"width":1024},{"height":1360,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/107951143299788342143/photos\\">Arye Deutsch</a>"],"width":2048},{"height":1360,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/107951143299788342143/photos\\">Arye Deutsch</a>"],"width":2048},{"height":2448,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/106916681790324914796/photos\\">Karivo 32</a>"],"width":3264},{"height":2448,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/106916681790324914796/photos\\">Karivo 32</a>"],"width":3264},{"height":4160,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/104459156750413953072/photos\\">Eran Frieman</a>"],"width":3120},{"height":2448,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/106916681790324914796/photos\\">Karivo 32</a>"],"width":3264},{"height":2448,"html_attributions":["<a href=\\"https://maps.google.com/maps/contrib/106916681790324914796/photos\\">Karivo 32</a>"],"width":3264}],"place_id":"ChIJC72L8YFLHRURukXv09VhNGA","rating":4.5,"reference":"CmRgAAAAM42Vi7Kv8OFN3qau_K58SVuD9OQHyWqyPZ11bx6YhwZm0-8N9OZRQejwTV2zpiHySK4_2R4oQt5sbjaV4BP6W6r-WNV7ZVSW80X853dPUwlYK3YFU2kuYdXVUvYRDtP5EhC4WYD9efsec_IT4P6B4qcmGhRj8Y8T0i0IlwTbrvDHSpyb2pIulQ","reviews":[{"aspects":[{"rating":3,"type":"overall"}],"author_name":"Ronen Rothfarb","author_url":"https://plus.google.com/106859708030543670702","language":"en","profile_photo_url":"//lh5.googleusercontent.com/-rPMwKDkp200/AAAAAAAAAAI/AAAAAAAAR2k/MeJcHVDbDsI/photo.jpg","rating":5,"text":"One of my favorite Urban open-spaces in Israel !\\n\\nA great place to chill out in the middle of you work day or your city tour.\\n\\n\\"Less is more.\\" - There are no special attractions at the plaza. Just being in this central place, between the Theater and Orchestra buildings, watching the people around you going through or playing with their children at the lowered garden, makes you magically calmer and happy.\\n\\nThe only time the plaza is not packed with joyful youngsters and families, is in mid-days of July-August, when the sun is just too much (The square is not shaded).\\n\\nAs one of few central plazas in Tel-Aviv, Israel's biggest city, Habima Square hosts from time to time special events. From massive demonstrations to the annual water war (taking place around the street level shallow pool). Another summer monthly event is a soap-bubbles gathering (The Bubble Project), taking place every 1st friday.","time":1447662004},{"aspects":[{"rating":3,"type":"overall"}],"author_name":"Liran Sperling","author_url":"https://plus.google.com/112837436743738179901","language":"en","profile_photo_url":"//lh4.googleusercontent.com/-gB1Vxlv3F_U/AAAAAAAAAAI/AAAAAAAAAKg/oSdNrBrsEwo/photo.jpg","rating":5,"text":"Cool tip: when sitting on the wooden stairs near of the garden, there's a pleasant music playing. \\nOnce there are performances inside the hall of culture auditorium, you can hear a live stream from inside ;-)","time":1451091889},{"aspects":[{"rating":3,"type":"overall"}],"author_name":"Erez Savir","author_url":"https://plus.google.com/111752449823543425426","language":"en","profile_photo_url":"//lh3.googleusercontent.com/-vxTtRCjPBIM/AAAAAAAAAAI/AAAAAAAACHU/sKWUC8eT5WQ/photo.jpg","rating":5,"text":"Cool place to hangout in the sun.\\n","time":1456175676},{"aspects":[{"rating":3,"type":"overall"}],"author_name":"Gabi Mor","author_url":"https://plus.google.com/100999616462364274187","language":"en","profile_photo_url":"//lh4.googleusercontent.com/-mjzZqRMUvGk/AAAAAAAAAAI/AAAAAAAAAlg/1_Eg5FN7gvY/photo.jpg","rating":5,"text":"Sit back and relax on the sunken garden edge or just walk around near the beautiful flat pool.","time":1457974602},{"aspects":[{"rating":3,"type":"overall"}],"author_name":"Avital Tzur","author_url":"https://plus.google.com/108960536177120877091","language":"en","profile_photo_url":"//lh5.googleusercontent.com/-UZVU27Nqih0/AAAAAAAAAAI/AAAAAAAAPKE/1Vm587Dw6ws/photo.jpg","rating":5,"text":"Very nice place.  Great for hanging out with the kids.  They love ❤ it. ","time":1452354936}],"scope":"GOOGLE","types":["point_of_interest","establishment"],"url":"https://maps.google.com/?cid=6932273297441637818","user_ratings_total":123,"utc_offset":180,"vicinity":"Tel Aviv-Yafo","html_attributions":[]}	{"id":2,"name":"Handyman","icon":"/assets/img/icons/handyman-icon.png"}	Do something here?	hour	paypal	22	1460191295999
5	1	open	Dizengoff St 99, Tel Aviv-Yafo, Israel	32.079309	34.77390349999996	{"address_components":[{"long_name":"99","short_name":"99","types":["street_number"]},{"long_name":"Dizengoff Street","short_name":"Dizengoff St","types":["route"]},{"long_name":"Tel Aviv-Yafo","short_name":"Tel Aviv-Yafo","types":["locality","political"]},{"long_name":"Tel Aviv District","short_name":"Tel Aviv District","types":["administrative_area_level_1","political"]},{"long_name":"Israel","short_name":"IL","types":["country","political"]}],"adr_address":"<span class=\\"street-address\\">Dizengoff St 99</span>, <span class=\\"locality\\">Tel Aviv-Yafo</span>, <span class=\\"country-name\\">Israel</span>","formatted_address":"Dizengoff St 99, Tel Aviv-Yafo, Israel","geometry":{"access_points":[{"location":{"lat":0,"lng":0},"travel_modes":["DRIVING","BICYCLING","WALKING","TRANSIT"]}],"location":{"lat":32.079309,"lng":34.77390349999996}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png","id":"9b6940f08985d91e8d9aeb96e22fa2e9f4d93c93","name":"Dizengoff St 99","place_id":"EiZEaXplbmdvZmYgU3QgOTksIFRlbCBBdml2LVlhZm8sIElzcmFlbA","reference":"CpQBhAAAAK2cMCUBFk-6F_SBj3EE8oClLstu0YVjY70slqNgHTlzCkYgTS4vhSgJjpEkwPaWuWV4lu6KivTQl2Zmd_4bw0512WdScKZ6HsAvIDyHo0zmVV80f2RYgmlJ5mED5us8iX5m9oCy0MlrMVTL1NNMlRnNR_-jSVCXGuSvcV2GRTzzeA2M4DrOLpRtF2-KEwdTIxIQ3X3-6C70FQ7wnRSTxmUg6xoU8afQThv9B_urhlr874hchDd41qE","scope":"GOOGLE","types":["street_address"],"url":"https://maps.google.com/?q=Dizengoff+St+99,+Tel+Aviv-Yafo,+Israel&ftid=0x151d4c78a123fb6f:0x726e3f48f2363cbc","vicinity":"Tel Aviv-Yafo","html_attributions":[]}	{"id":1,"name":"Laundry","icon":"/assets/img/icons/laundry-icon.png"}	Good Italian resturante	pauschal	paypal	123	1460191272603
\.


--
-- TOC entry 1969 (class 0 OID 0)
-- Dependencies: 173
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udo
--

SELECT pg_catalog.setval('tasks_id_seq', 6, true);


--
-- TOC entry 1957 (class 0 OID 24590)
-- Dependencies: 174
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: udo
--

COPY users (id, fname, lname, email, facebook_id, google_id, picture, roles, password) FROM stdin;
1	Aviad	Blumenfeld	aviadblu@gmail.com	\N	111226596840055774672	https://lh3.googleusercontent.com/-m1_g_Op9J7g/AAAAAAAAAAI/AAAAAAAAFcg/Zh12wXgsJx8/photo.jpg?sz=50	["user"]	\N
\.


--
-- TOC entry 1970 (class 0 OID 0)
-- Dependencies: 175
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: udo
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- TOC entry 1845 (class 2606 OID 24602)
-- Name: pk_id; Type: CONSTRAINT; Schema: public; Owner: udo
--

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_id PRIMARY KEY (id);


--
-- TOC entry 1843 (class 2606 OID 24604)
-- Name: pk_task_id; Type: CONSTRAINT; Schema: public; Owner: udo
--

ALTER TABLE ONLY tasks
    ADD CONSTRAINT pk_task_id PRIMARY KEY (id);


--
-- TOC entry 1841 (class 2606 OID 24606)
-- Name: session_pkey; Type: CONSTRAINT; Schema: public; Owner: udo
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 1847 (class 2606 OID 24608)
-- Name: users_email_key; Type: CONSTRAINT; Schema: public; Owner: udo
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 1965 (class 0 OID 0)
-- Dependencies: 7
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-04-09 12:09:22 IDT

--
-- PostgreSQL database dump complete
--

