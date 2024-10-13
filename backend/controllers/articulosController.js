import pool from "../pool.js";
import { check, validationResult } from 'express-validator';

const skuValidate = [
    check('sku').matches(/^\d+$/).withMessage('El sku debe contener solo números.')
]

const crearArticuloValidate = [
    check('sku').matches(/^\d+$/).withMessage('El sku debe contener solo números.'),
    check('descontinuado').isInt().withMessage('El descontinuado debe ser un número entero.'),
    check('articulo').isLength({ max: 15 }).withMessage('El articulo esta muy largo'),
    check('marca').isLength({ max: 15 }).withMessage('La marca esta muy largo'),
    check('modelo').isLength({ max: 20 }).withMessage('El modelo esta muy largo'),
    check('departamento').isLength({ min: 1, max: 1 }).withMessage('El departamento debe ser un digito'),
    check('clase').isLength({ min: 2,  max: 2 }).withMessage('La clase debe ser dos digitos'),
    check('familia').isLength({ min: 3,  max: 3 }).withMessage('LA familia debe ser tres digitos'),
    check('stock').isInt().withMessage('El stock debe ser un número entero.'),
    check('cantidad').isInt().withMessage('La cantidad debe ser un número entero.'),
    check('fechaAlta').isDate().withMessage('La fecha de alta debe ser una fecha valida.'),
    check('fechaBaja').isDate().withMessage('La fecha de baja debe ser una fecha valida.'),
]

export const getArticulos = (req, res) => {
    pool.query('SELECT * FROM getArticulos();', (error, results) => {
        if(error){
            console.error('Error obteniendo articulo:', error);
            res.status(500).send('Error obteniendo articulo');
        } else {
            console.log('Enlazando articulo...');
            res.status(201).json({message : 'Articulo obtenido exitosamente!', articulo: results.rows});
        }
    });
}

export const getArticuloBySku = [
    skuValidate,
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sku = req.params.sku;

    pool.query('SELECT * FROM getArticuloBySku($1::INT);', [sku], (error, results) => {
        if(error){
            console.error('Error obteniendo articulo:', error);
            res.status(500).send('Error obteniendo articulo');
        } else {
            console.log('Enlazando articulo...');
            res.status(201).json({message : 'Articulo obtenido exitosamente!', articulo: results.rows});
        }
    });
}];

//Create
export const crearArticulo = [
    crearArticuloValidate,
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            sku,
            descontinuado,
            articulo,
            marca,
            modelo,
            departamento,
            clase,
            familia,
            stock,
            cantidad,
            fechaAlta,
            fechaBaja
        } = req.body;

        console.log({
            sku: sku,
            descontinuado: descontinuado,
            articulo: articulo,
            marca: marca,
            modelo: modelo,
            departamento: departamento,
            clase: clase,
            familia: familia,
            stock: stock,
            cantidad: cantidad,
            fechaAlta: fechaAlta,
            fechaBaja: fechaBaja
        });
        const query = `
            CALL crearArticulo(
                $1::INT, 
                $2::INT, 
                $3::TEXT, 
                $4::TEXT, 
                $5::TEXT,
                $6::TEXT,
                $7::TEXT,
                $8::TEXT,
                $9::INT,
                $10::INT,
                $11::DATE,
                $12::DATE
            );
        `;
        pool.query(
            query,
            [
                sku,
                descontinuado,
                articulo,
                marca,
                modelo,
                departamento,
                clase,
                familia,
                stock,
                cantidad,
                fechaAlta,
                fechaBaja
            ],
            (error, results) => {
                if (error) {
                    console.error('Error creando artículo:', error);
                    return res.status(500).send('Error creando artículo');
                }
                console.log('Artículo creado exitosamente');
                return res.status(201).json({ 
                    message: 'Artículo creado exitosamente!',
                    articulo: {
                        sku,
                        descontinuado,
                        articulo,
                        marca,
                        modelo,
                        departamento,
                        clase,
                        familia,
                        stock,
                        cantidad,
                        fechaAlta,
                        fechaBaja
                    }
                });
            }
        );
    }
];

//Update
export const actualizarArticulo = [
    crearArticuloValidate,
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            sku,
            descontinuado,
            articulo,
            marca,
            modelo,
            departamento,
            clase,
            familia,
            stock,
            cantidad,
            fechaAlta,
            fechaBaja
        } = req.body;

        const query = `
            CALL actualizarArticulo(
                $1::INT, 
                $2::INT, 
                $3::TEXT, 
                $4::TEXT, 
                $5::TEXT,
                $6::TEXT,
                $7::TEXT,
                $8::TEXT,
                $9::INT,
                $10::INT,
                $11::DATE,
                $12::DATE
            );
        `;
        pool.query(
            query,
            [
                sku,
                descontinuado,
                articulo,
                marca,
                modelo,
                departamento,
                clase,
                familia,
                stock,
                cantidad,
                fechaAlta,
                fechaBaja
            ],
            (error, results) => {
                if (error) {
                    console.error('Error actualizando artículo:', error);
                    return res.status(500).send('Error actualizando artículo');
                }
                console.log('Artículo actualizado exitosamente');
                return res.status(200).json({ 
                    message: 'Artículo actualizado exitosamente!',
                    articulo: {
                        sku,
                        descontinuado,
                        articulo,
                        marca,
                        modelo,
                        departamento,
                        clase,
                        familia,
                        stock,
                        cantidad,
                        fechaAlta,
                        fechaBaja
                    }
                });
            }
        );
    }
];


//Delete
export const eliminarArticulo = [
    (req, res) => {
        const { sku } = req.params;

        const query = `
            CALL eliminarArticulo($1::INT);
        `;
        pool.query(
            query,
            [sku],
            (error, results) => {
                if (error) {
                    console.error('Error eliminando artículo:', error);
                    return res.status(500).send('Error eliminando artículo');
                }
                console.log('Artículo eliminado exitosamente');
                return res.status(200).json({ message: 'Artículo eliminado exitosamente!' });
            }
        );
    }
];
