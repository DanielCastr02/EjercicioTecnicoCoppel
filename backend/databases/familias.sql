CREATE TABLE familias (
    id CHAR(3) NOT NULL,
    id_clase CHAR(2) NOT NULL,
    id_departamento CHAR(1) NOT NULL,
    nombre TEXT NOT NULL,
    PRIMARY KEY (id, id_clase, id_departamento),
    FOREIGN KEY (id_clase, id_departamento) REFERENCES clases (id, id_departamento)
);

--FUNCIONES
CREATE OR REPLACE FUNCTION getFamiliasByClase_DepartamentoId(
    clase_id CHAR(2), 
    departamento_id CHAR(1)
) 
RETURNS TABLE(id CHAR(3), id_clase CHAR(2), id_departamento CHAR(1), nombre TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY 
    SELECT f.id, f.id_clase, f.id_departamento, f.nombre
    FROM familias f
    WHERE f.id_clase = clase_id AND f.id_departamento = departamento_id;
END;
$$;

CREATE FUNCTION validar_familia_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT NEW.id ~ '^[0-9]{3}$' THEN
        RAISE EXCEPTION 'El ID de la familia debe ser un número de tres dígitos (000-999)';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--TRIGGERS
CREATE TRIGGER validar_familia_id
BEFORE INSERT ON familias
FOR EACH ROW
EXECUTE FUNCTION validar_familia_id();

--INSERT BD
INSERT INTO familias (id, id_clase, id_departamento, nombre) VALUES
('000', '01', 1, 'SIN NOMBRE'),
('001', '02', 1, 'LICUADORAS'),
('002', '02', 1, 'EXCLUSIVO COPPEL.COM'),
('001', '03', 1, 'BATIDORA MANUAL'),
('002', '03', 1, 'PROCESADOR'),
('003', '03', 1, 'PICADORA'),
('004', '03', 1, 'BATIDORA PEDESTAL'),
('005', '03', 1, 'BATIDORA FUENTE DE SODAS'),
('006', '03', 1, 'MULTIPRACTICOS'),
('007', '03', 1, 'EXCLUSIVOS COPPEL.COM'),
('001', '04', 1, 'CAFETERAS'),
('002', '04', 1, 'PERCOLADORAS'),
('001', '01', 2, 'AMPLIFICADOR/RECEPTOR'),
('002', '01', 2, 'KIT DE INSTALACION'),
('003', '01', 2, 'AMPLIFICADORES COPPEL'),
('001', '02', 2, 'AUTOESTEREO CD C/BOOMBOX'),
('002', '02', 2, 'ACCESORIOS CAR AUDIO'),
('003', '02', 2, 'AMPLIFICADOR'),
('004', '02', 2, 'ALARMA AUTO/CASA/OFICINA'),
('005', '02', 2, 'SIN MECANISMO'),
('006', '02', 2, 'CON CD'),
('007', '02', 2, 'MULTIMEDIA'),
('008', '02', 2, 'PAQUETE SIN MECANISMO'),
('009', '02', 2, 'PAQUETE CON CD'),
('001', '01', 3, 'PILLOW TOP KS'),
('002', '01', 3, 'PILLOW TOP DOBLE KS'),
('003', '01', 3, 'HULE ESPUMA KS'),
('001', '02', 3, 'ESTANDAR INDIVIDUAL'),
('002', '02', 3, 'PILLOW TOP INDIVIDUAL'),
('003', '02', 3, 'PILLOW TOP DOBLE INDIVIDUAL'),
('001', '01', 4, 'ESQUINERAS SUPERIORES'),
('002', '01', 4, 'TIPO L SECCIONAL'),
('001', '02', 4, 'SILLON OCASIONAL'),
('002', '02', 4, 'PUFF'),
('003', '02', 4, 'BAUL'),
('004', '02', 4, 'TABURETE'),
('001', '03', 4, 'SOFA CAMA TAPIZADO'),
('002', '03', 4, 'SOFA CAMA CLASICO'),
('003', '03', 4, 'ESTUDIO');
