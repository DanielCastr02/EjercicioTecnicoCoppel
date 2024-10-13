import pool from "../pool.js";
import { check, validationResult } from 'express-validator';

const idValidate = [
    check('id').matches(/^\d+$/).withMessage('El id debe contener solo números.')
]

const idDepartamentoValidate = [
    check('departamento_id').matches(/^\d+$/).withMessage('El id debe contener solo números.')
]

const idFamiliaValidate = [
    check('clase_id').matches(/^\d+$/).withMessage('El id debe contener solo números.'),
    check('departamento_id').matches(/^\d+$/).withMessage('El id debe contener solo números.')
]

export const getDepartamentos = (req, res) => {
    pool.query('SELECT * FROM getDepartamentos();', (error, results) => {
        if(error){
            console.error('Error obteniendo departamentos:', error);
            res.status(500).send('Error obteniendo departamentos');
        } else {
            console.log('Enlazando departamento...');
            res.status(201).json({message : 'Departamentos obtenido exitosamente!', departamento: results.rows});
        }
    });
}

export const getDepartamentoById = [
    idValidate,
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;

    pool.query('SELECT * FROM getDepartamentoById($1::TEXT)', [id], (error, results) => {
        if(error){
            console.error('Error obteniendo departamentos:', error);
            res.status(500).send('Error obteniendo departamentos');
        } else {
            console.log('Enlazando departamento...');
            res.status(201).json({message : 'Departamentos obtenido exitosamente!', departamento: results.rows});
        }
    });
}];


export const getClaseByDepartamentoId = [
    // idDepartamentoValidate,
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.departamento_id;

    pool.query('SELECT * FROM getClasesByDepartamentoId($1::TEXT)', [id], (error, results) => {
        if(error){
            console.error('Error obteniendo clases:', error);
            res.status(500).send('Error obteniendo clases');
        } else {
            console.log('Enlazando clases...');
            res.status(201).json({message : 'Clases obtenido exitosamente!', clase: results.rows});
        }
    });
}];

export const getFamiliasByClase_DepartamentoId = [
    // idFamiliaValidate,
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const clase_id = req.query.clase_id;
    const departamento_id = req.query.departamento_id;

    pool.query('SELECT * FROM getFamiliasByClase_DepartamentoId($1::TEXT, $2::TEXT)',
         [clase_id, departamento_id], (error, results) => {
        if(error){
            console.error('Error obteniendo familias:', error);
            res.status(500).send('Error obteniendo familias');
        } else {
            console.log('Enlazando familias...');
            res.status(201).json({message : 'Familias obtenidas exitosamente!', familia: results.rows});
        }
    });
}];

