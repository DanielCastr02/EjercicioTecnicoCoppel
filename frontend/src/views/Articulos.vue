<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4> Sistema Articulos</h4>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema">
                    <div class="mb-3 row">
                        <div class="col-md-6">
                            <div class="d-flex align-items-center">
                                <label for="sku" class="me-2">SKU:</label>
                                <Field name="sku" id="sku" type="text" class="form-control" maxlength="6" v-model="model.articulo.sku" @keypress="validateInputNumber" @keydown.enter="validarSku"/>
                            </div>
                            <ErrorMessage name="sku" class="errorValidacion"/>
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-end">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="descontinuado" :disabled="!actualizar" v-model="model.articulo.descontinuado" 
                                />
                                <label for="descontinuado" class="form-check-label">
                                    Descontinuado
                                </label>
                            </div>
                            <ErrorMessage name="descontinuado" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex align-items-center">
                            <label for="articulo" class="me-2">Articulo:</label>
                            <Field name="articulo" id="articulo" type="text" class="form-control" maxlength="15" v-model="model.articulo.articulo" :disabled="!alta" />
                            <ErrorMessage name="articulo" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex align-items-center">
                            <label for="marca" class="me-2">Marca:</label>
                            <Field name="marca" id="marca" type="text" class="form-control" maxlength="15" v-model="model.articulo.marca" :disabled="!alta" />
                            <ErrorMessage name="marca" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex align-items-center">
                            <label for="modelo" class="me-2">Modelo:</label>
                            <Field name="modelo" id="modelo" type="text" class="form-control" maxlength="20" v-model="model.articulo.modelo" :disabled="!alta" />
                            <ErrorMessage name="modelo" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex align-items-center">
                            <label for="departamento" class="me-2">Departamento:</label>
                            <select name="departamento" id="departamento" class="form-select" v-model="model.articulo.departamento" :disabled="!alta" @change="cargarClases">
                                <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">{{ departamento.nombre }} </option>
                            </select>
                            <ErrorMessage name="sexo" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex align-items-center">
                            <label for="clase" class="me-2">Clase:</label>
                            <select name="clase" id="clase" class="form-select" :disabled="!departamentoSelected" v-model="model.articulo.clase" @change="cargarFamilias" >
                                <option v-for="clase in clases" :key="clase.id" :value="clase.id">{{ clase.nombre}} </option>
                            </select>
                            <ErrorMessage name="sexo" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex align-items-center">
                            <label for="familia" class="me-2">Familia:</label>
                            <select name="familia" id="familia" class="form-select" :disabled="!claseSelected" v-model="model.articulo.familia">
                                <option v-for="familia in familias" :key="familia.id" :value="familia.id">{{ familia.nombre}} </option>
                            </select>
                            <ErrorMessage name="sexo" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <div class="d-flex align-items-center">
                                    <label for="stock" class="me-2">Stock:</label>
                                    <Field name="stock" id="stock" type="text" class="form-control" maxlength="9" v-model="model.articulo.stock" @keypress="validateInputNumber" :disabled="!alta"/>
                                    <ErrorMessage name="stock" class="errorValidacion"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <div class="d-flex align-items-center">
                                    <label for="cantidad" class="me-2">Cantidad:</label>
                                    <Field name="cantidad" id="cantidad" type="text" class="form-control" maxlength="9" v-model="model.articulo.cantidad" @keypress="validateInputNumber" :disabled="!alta"/>
                                    <ErrorMessage name="cantidad" class="errorValidacion"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <div class="d-flex align-items-center">
                                    <label for="fechaAlta" class="me-2">Fecha Alta:</label>
                                    <Field name="fechaAlta" id="fechaAlta" type="date" class="form-control" :disabled="true" v-model="model.articulo.fechaAlta"/>
                                    <ErrorMessage name="fechaAlta" class="errorValidacion"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <div class="d-flex align-items-center">
                                    <label for="fechaBaja" class="me-2">Fecha Baja:</label>
                                    <Field name="fechaBaja" id="fechaBaja" type="date" class="form-control" :disabled="true" v-model="model.articulo.fechaBaja"/>
                                    <ErrorMessage name="fechaBaja" class="errorValidacion"/>
                                </div>
                            </div>
                        </div>
                    <div>
                    </div>
                        </div>
                    <div class="mb-3 d-flex justify-content-end">
                        <button v-if="alta && !cambio" @click.prevent="crearArticulo" class="btn btn-primary me-2"> Guardar </button>
                        <button v-if="cambio && !actualizar" @click.prevent="botonActualizar" class="btn btn-secondary me-2"> Actualizar </button>
                        <button v-if="actualizar" @click.prevent="actualizarArticulo" class="btn btn-success me-2"> Confirmar </button>
                        <button v-if="cambio" @click.prevent="eliminarArticulo" class="btn btn-danger"> Eliminar </button>
                    </div>
                </Form> 
            </div>
        </div>
    </div>
</template>
<script>
import { Field, ErrorMessage, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import apiclient from '../apiclient.js';
    export default {
        nombre: 'articulos',
        components: {Field, ErrorMessage, Form},
        data(){
        //     const validationSchema = zod.object({
        //     sku: zod
        //     .string()
        //     .nonempty({ message: "El SKU no puede estar vacío" }),
        //     articulo: zod
        //     .string()
        //     .nonempty({ message: "El artículo no puede estar vacío" }),
        //     marca: zod
        //     .string()
        //     .nonempty({ message: "La marca no puede estar vacía" }),
        //     modelo: zod
        //     .string()
        //     .nonempty({ message: "El modelo no puede estar vacío" }),
        //     departamento: zod
        //     .number()
        //     .int()
        //     .nonempty({ message: "El departamento no puede estar vacío" }),
        //     clase: zod
        //     .number()
        //     .int()
        //     .nonempty({ message: "La clase no puede estar vacía" }),
        //     familia: zod
        //     .number()
        //     .int()
        //     .nonempty({ message: "La familia no puede estar vacía" }),
        //     stock: zod
        //     .number()
        //     .int()
        //     .nonempty({ message: "El stock no puede estar vacío" }),
        //     cantidad: zod
        //     .number()
        //     .int()
        //     .nonempty({ message: "La cantidad no puede estar vacía" }),
        // });
            return{
                //validationSchema,
                alta: false,
                cambio: false,
                actualizar: false,
                departamentoSelected: false,
                claseSelected: false,
                departamentos: [],
                clases: [],
                familias: [],
                model:{
                    articulo:{
                        sku:'',
                        descontinuado: 0,
                        articulo:'',
                        marca:'',
                        modelo:'',
                        departamento: '',
                        clase: '',
                        familia: '',
                        stock: '',
                        cantidad: '',
                        fechaAlta: new Date().toISOString().split('T')[0],
                        fechaBaja: '1900-01-01',
                    }
                }
            }
        },
        methods:{
            crearArticulo(){
                try {
                    apiclient.articulos.crearArticulo(
                        this.model.articulo.sku,
                        this.model.articulo.descontinuado,
                        this.model.articulo.articulo,
                        this.model.articulo.marca,
                        this.model.articulo.modelo,
                        this.model.articulo.departamento,
                        this.model.articulo.clase,
                        this.model.articulo.familia,
                        this.model.articulo.stock,
                        this.model.articulo.cantidad,
                        this.model.articulo.fechaAlta,
                        this.model.articulo.fechaBaja
                    ).then(res =>{
                        console.log(this.model);
                    });
                    //alert('Articulo Creado con exito!');
                } catch (error) {
                    console.error(error)
                }
                this.limpiar();
            },
            actualizarArticulo(){
                try {
                    apiclient.articulos.actualizarArticulo(
                        this.model.articulo.sku,
                        this.model.articulo.descontinuado,
                        this.model.articulo.articulo,
                        this.model.articulo.marca,
                        this.model.articulo.modelo,
                        this.model.articulo.departamento,
                        this.model.articulo.clase,
                        this.model.articulo.familia,
                        this.model.articulo.stock,
                        this.model.articulo.cantidad,
                        this.model.articulo.fechaAlta,
                        this.model.articulo.fechaBaja
                    ).then(res =>{
                        console.log(this.model);
                    });
                    //alert('Articulo Actualizado con exito!');
                } catch (error) {
                    console.error(error)
                }
                this.limpiar();
            },
            eliminarArticulo(){
                try {
                    apiclient.articulos.eliminarArticulo(this.model.articulo.sku).then(res =>{
                        console.log(this.model);
                    });
                    //alert('Articulo Eliminado con exito!');
                } catch (error) {
                    console.error(error)
                }
                this.limpiar();
            },
            botonActualizar(){
                this.alta = true;
                this.departamentoSelected = true;
                this.claseSelected = true;
                this.actualizar = true;
            },
            getDepartamentos(){
                apiclient.dcf.getDepartamentos().then(res =>{
                    this.departamentos = res.data.departamento;
                });
            },
            getClases(){
                apiclient.dcf.getClaseByDepartamentoId(this.model.articulo.departamento).then(res =>{
                    this.clases = res.data.clase;
                });
            },
            getFamilias(){
                apiclient.dcf.getFamiliasByClase_DepartamentoId(this.model.articulo.clase, this.model.articulo.departamento).then(res =>{
                    this.familias = res.data.familia;
                });
            },
            cargarClases(){
                this.model.articulo.clase = '';
                this.model.articulo.familia = '';
                this.claseSelected = false;
                this.getClases();
                this.departamentoSelected = true;
            },
            cargarFamilias(){
                this.model.articulo.familia = '';
                this.getFamilias();
                this.claseSelected = true;
            },
            validateInputNumber(event) {
                const char = String.fromCharCode(event.keyCode);
                const regex = /^[0-9]*$/;
                if (!regex.test(char)) {
                    event.preventDefault();
                }
            },
            validarSku(event){
                event.preventDefault();
                if(this.model.articulo.sku.length == 0){
                    this.limpiar();
                }
                this.getDepartamentos();
                this.departamentoSelected = false;
                this.claseSelected = false;
                apiclient.articulos.getArticuloBySku(this.model.articulo.sku).then(res =>{
                    if(res.data.articulo.length > 0){
                        this.cambio = true;
                        this.alta = false;
                        this.model.articulo = res.data.articulo[0];
                        this.model.articulo.departamento = res.data.articulo[0].id_departamento;
                        this.model.articulo.clase = res.data.articulo[0].id_clase;
                        this.model.articulo.familia = res.data.articulo[0].id_familia;
                        this.model.articulo.fechaAlta = res.data.articulo[0].fecha_alta.split('T')[0];
                        this.model.articulo.fechaBaja = res.data.articulo[0].fecha_baja.split('T')[0];
                        this.getClases();
                        this.getFamilias();
                    }else{
                        this.alta = true;
                        this.cambio = false;
                    }
                });
            },
            limpiar(){
                this.model.articulo = {
                    sku:'',
                    descontinuado: 0,
                    articulo:'',
                    marca:'',
                    modelo:'',
                    departamento: '',
                    clase: '',
                    familia: '',
                    stock: '',
                    cantidad: '',
                    fechaAlta: new Date().toISOString().split('T')[0],
                    fechaBaja: '1900-01-01',
                }
                this.alta = false;
                this.cambio = false;
                this.actualizar = false;
                this.departamentoSelected = false;
                this.claseSelected = false;
            }
        }
    }
</script>

<style scoped>
.errorValidacion{
    color: red;
    
}
</style>