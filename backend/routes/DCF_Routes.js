import { Router } from "express";
import { getDepartamentos, getClaseByDepartamentoId,  getFamiliasByClase_DepartamentoId } from "../controllers/DCF_Controller.js";

const DCF_Routes = Router();


DCF_Routes.get('/departamentos', getDepartamentos);
DCF_Routes.get('/familias', getFamiliasByClase_DepartamentoId);
DCF_Routes.get('/:departamento_id', getClaseByDepartamentoId);

export default DCF_Routes;