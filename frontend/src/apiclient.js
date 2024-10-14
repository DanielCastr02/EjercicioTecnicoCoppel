import axios from "axios";

const axiosinstance = axios.create({
    baseURL: 'http://localhost:3000/api/'
});

export default {
    articulos:{
        getArticuloBySku(sku) {
            return axiosinstance.get(`articulos/${sku}`);
        },
        crearArticulo(articulo) {
            console.log(articulo);
            return axiosinstance.post(`articulos/crear`, articulo);
        },
        actualizarArticulo(articulo) {
            return axiosinstance.put(`articulos/actualizar`, articulo);
        },
        eliminarArticulo(sku){
            return axiosinstance.delete(`articulos/eliminar/${sku}`);
        },
        exportCSV(){
            return axiosinstance.get(`articulos/export`);
        }
    },
    dcf:{
        getDepartamentos(){
            return axiosinstance.get('dcf/departamentos');
        },
        getClaseByDepartamentoId(departamento_id){
            return axiosinstance.get(`dcf/${departamento_id}`);
        },
        getFamiliasByClase_DepartamentoId(clase_id, departamento_id){
            return axiosinstance.get(`dcf/familias`, {
                params: {
                    clase_id: clase_id,
                    departamento_id: departamento_id
                }
            });
        },
    }
};