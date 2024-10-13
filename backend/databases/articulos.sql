CREATE TABLE articulos (
    sku INT PRIMARY KEY,
    descontinuado INT NOT NULL,
    articulo VARCHAR(15) NOT NULL,
    marca VARCHAR(15) NOT NULL,
    modelo VARCHAR(20) NOT NULL,
    id_departamento CHAR(1) NOT NULL,
    id_clase CHAR(2) NOT NULL,
    id_familia CHAR(3) NOT NULL,
    stock INT NOT NULL,
    cantidad INT NOT NULL,
    fecha_alta DATE NOT NULL,
    fecha_baja DATE NOT NULL,
    FOREIGN KEY (id_departamento) REFERENCES departamentos (id),
    FOREIGN KEY (id_departamento, id_clase) REFERENCES clases (id_departamento, id),
    FOREIGN KEY (id_departamento, id_clase, id_familia) REFERENCES familias (id_departamento, id_clase, id)
);
--FUNCIONES
CREATE OR REPLACE FUNCTION getArticuloBySku(
    articulo_sku INT
) 
RETURNS TABLE(
    sku INT,
    descontinuado INT,
    articulo VARCHAR(15),
    marca VARCHAR(15),
    modelo VARCHAR(20),
    id_departamento CHAR(1),
    id_clase CHAR(2),
    id_familia CHAR(3),
    stock INT,
    cantidad INT,
    fecha_alta DATE,
    fecha_baja DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY 
    SELECT a.sku, a.descontinuado, a.articulo, a.marca, a.modelo, 
           a.id_departamento, a.id_clase, a.id_familia, 
           a.stock, a.cantidad, a.fecha_alta, a.fecha_baja
    FROM articulos a
    WHERE a.sku = articulo_sku; 
END;
$$;

-- PROCEDIMIENTOS ALMACENADOS
--Post
CREATE PROCEDURE crearArticulo(
    p_sku INT, 
    p_descontinuado INT, 
    p_articulo VARCHAR(15), 
    p_marca VARCHAR(15), 
    p_modelo VARCHAR(20), 
    p_id_departamento CHAR(1), 
    p_id_clase CHAR(2), 
    p_id_familia CHAR(3), 
    p_stock INT, 
    p_cantidad INT, 
    p_fecha_alta DATE, 
    p_fecha_baja DATE
) 
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO articulos (
        sku, 
        descontinuado, 
        articulo, 
        marca, 
        modelo, 
        id_departamento, 
        id_clase, 
        id_familia, 
        stock, 
        cantidad, 
        fecha_alta, 
        fecha_baja
    ) VALUES (
        p_sku, 
        p_descontinuado, 
        p_articulo, 
        p_marca, 
        p_modelo, 
        p_id_departamento, 
        p_id_clase, 
        p_id_familia, 
        p_stock, 
        p_cantidad, 
        p_fecha_alta, 
        p_fecha_baja
    );
END;
$$;

--Put
CREATE PROCEDURE actualizarArticulo(
    p_sku INT, 
    p_descontinuado INT, 
    p_articulo VARCHAR(15), 
    p_marca VARCHAR(15), 
    p_modelo VARCHAR(20), 
    p_id_departamento CHAR(1), 
    p_id_clase CHAR(2), 
    p_id_familia CHAR(3), 
    p_stock INT, 
    p_cantidad INT, 
    p_fecha_alta DATE, 
    p_fecha_baja DATE
) 
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE articulos
    SET 
        descontinuado = p_descontinuado, 
        articulo = p_articulo, 
        marca = p_marca, 
        modelo = p_modelo, 
        id_departamento = p_id_departamento, 
        id_clase = p_id_clase, 
        id_familia = p_id_familia, 
        stock = p_stock, 
        cantidad = p_cantidad, 
        fecha_alta = p_fecha_alta, 
        fecha_baja = p_fecha_baja
    WHERE sku = p_sku;
END;
$$;

--Delete
CREATE PROCEDURE eliminarArticulo(
    p_sku INT
) 
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM articulos WHERE sku = p_sku;
END;
$$;
