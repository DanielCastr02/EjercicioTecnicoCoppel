import axios from "axios";

const axiosinstance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

export default {
    articulos:{
        getArticuloBySku(sku) {
            return axiosinstance.get(`articulos/${sku}`);
        },
        crearArticulo(sku, descontinuado, articulo, marca, modelo, departamento, clase, familia, stock, cantidad, fechaAlta, fechaBaja) {
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
        
            return axiosinstance.post(`articulos/crear`, {
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
        },
        actualizarArticulo(sku, descontinuado, articulo, marca, modelo, departamento, clase, familia, stock, cantidad, fechaAlta, fechaBaja) {
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
        
            return axiosinstance.put(`articulos/actualizar`, {
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
        },
        eliminarArticulo(sku){
            return axiosinstance.delete(`articulos/eliminar/${sku}`);
        },
    },
    dcf:{
        getDepartamentos(){
            return axiosinstance.get('dcf/departamentos');
        },
        getClaseByDepartamentoId(departamento_id){
            return axiosinstance.get(`dcf/${departamento_id}`);
        },
        getFamiliasByClase_DepartamentoId(clase_id, departamento_id){
            console.log({
                clase_id: clase_id,
                departamento_id: departamento_id
            });
            return axiosinstance.get(`dcf/familias`, {
                params: {
                    clase_id: clase_id,
                    departamento_id: departamento_id
                }
            });
        },
    }
};