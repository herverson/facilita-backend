-- Table: public.clients

-- DROP TABLE IF EXISTS public.clients;

CREATE TABLE IF NOT EXISTS public.clients
(
    id integer NOT NULL DEFAULT nextval('clients_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(255) COLLATE pg_catalog."default" NOT NULL,
    x_coordinate real NOT NULL DEFAULT '0'::real,
    y_coordinate real NOT NULL DEFAULT '0'::real,
    CONSTRAINT clients_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.clients
    OWNER to facilita;