CREATE TABLE IF NOT EXISTS series (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    genero VARCHAR(255) NOT NULL,
    plataforma VARCHAR(255) NOT NULL,
    temporadas INTEGER NOT NULL,
    calificacion DOUBLE PRECISION NOT NULL,
    en_emision BOOLEAN NOT NULL
);
