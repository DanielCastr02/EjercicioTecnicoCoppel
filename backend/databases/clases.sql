CREATE TABLE clases (
    id CHAR(2) NOT NULL,
    id_departamento CHAR(1) NOT NULL,
    nombre TEXT NOT NULL,
    PRIMARY KEY (id, id_departamento),
    FOREIGN KEY (id_departamento) REFERENCES departamentos (id)
);

--FUNCIONES
CREATE FUNCTION getClases()
RETURNS TABLE(id CHAR(2), id_departamento CHAR(1), nombre TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT * FROM clases;
END;
$$;

CREATE FUNCTION getClasesByDepartamentoId(departamento_id CHAR(1)) 
RETURNS TABLE(id CHAR(2), id_departamento CHAR(1), nombre TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT c.id, c.id_departamento, c.nombre
    FROM clases c
    WHERE c.id_departamento = departamento_id;
END;
$$;



CREATE FUNCTION validar_clase_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT NEW.id ~ '^[0-9]{2}$' THEN
        RAISE EXCEPTION 'El ID de la clase debe ser un número de dos dígitos (00-99)';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


--TRIGGERS
CREATE TRIGGER validar_clase_id
BEFORE INSERT ON clases
FOR EACH ROW
EXECUTE FUNCTION validar_clase_id();


INSERT INTO clases (id, id_departamento, nombre) VALUES
('01', 1, 'COMESTIBLES'),
('02', 1, 'LICUADORAS'),
('03', 1, 'BATIDORAS'),
('04', 1, 'CAFETERAS'),
('01', 2, 'AMPLIFICADORES CAR AUDIO'),
('02', 2, 'AUTO STEREOS'),
('01', 3, 'COLCHON'),
('02', 3, 'JUEGO BOX'),
('01', 4, 'SALAS'),
('02', 4, 'COMPLEMENTOS PARA SALA'),
('03', 4, 'SOFAS CAMA');