import { Router } from "express";
import { getArticulos, getArticuloBySku, crearArticulo, actualizarArticulo, eliminarArticulo, exportCSV } from "../controllers/articulosController.js";

const articulosRoutes = Router();


articulosRoutes.get('', getArticulos);
articulosRoutes.get('/export', exportCSV);
articulosRoutes.get('/:sku', getArticuloBySku);
articulosRoutes.post('/crear', crearArticulo );
articulosRoutes.put('/actualizar', actualizarArticulo );
articulosRoutes.delete('/eliminar/:sku', eliminarArticulo );

export default articulosRoutes;