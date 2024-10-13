CREATE TABLE departamentos (
    id CHAR(1) PRIMARY KEY NOT NULL,
    nombre TEXT NOT NULL
);

INSERT INTO departamentos (id, nombre) VALUES
(1, 'DOMESTICOS'),
(2, 'ELECTRONICA'),
(3, 'MUEBLE SUELTO'),
(4, 'SALAS, RECAMARAS, COMEDORES');

--PROCEDIMIENTOS ALMACENADOS



--FUNCIONES
CREATE FUNCTION getDepartamentos()
RETURNS TABLE(id CHAR(1), nombre TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT * FROM departamentos;
END;
$$;

CREATE FUNCTION getDepartamentoById(departamento_id CHAR(1))
RETURNS TABLE(id CHAR(1), nombre TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY SELECT d.id, d.nombre
    FROM departamentos d
    WHERE d.id = departamento_id; 
END;
$$;

CREATE FUNCTION validar_departamento_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT NEW.id ~ '^[0-9]$' THEN
        RAISE EXCEPTION 'El ID del departamento debe ser un número entre 0 y 9';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--TRIGGERS
CREATE TRIGGER validar_departamento_id
BEFORE INSERT ON departamentos
FOR EACH ROW
EXECUTE FUNCTION validar_departamento_id();
