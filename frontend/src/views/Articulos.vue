<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Sistema Articulos</h4>
            </div>
            <div class="card-body">
                <Form :validation-schema="validationSchema" @submit="checked" ref="form">
                    <div class="row mb-3 align-items-center">
                        <div class="col-md-2">
                            <label for="sku" class="form-label">SKU:</label>
                        </div>
                        <div class="col-md-6">
                            <Field name="sku" id="sku" type="number" class="form-control" maxlength="6" v-model="model.articulo.sku" @keypress="validateInputNumber" @keydown.enter="validarSku"/>
                            <ErrorMessage name="sku" class="errorValidacion"/>
                        </div>
                        <div class="col-md-4 d-flex align-items-center">
                            <input 
                                class="form-check-input me-2" 
                                type="checkbox" 
                                id="descontinuado" 
                                :disabled="!actualizar" 
                                v-model="model.articulo.descontinuado" 
                                :true-value="1" 
                                :false-value="0" 
                                />
                            <label for="descontinuado" class="form-check-label">Descontinuado</label>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-2">
                            <label for="articulo" class="form-label">Articulo:</label>
                        </div>
                        <div class="col-md-10">
                            <Field name="articulo" id="articulo" type="text" class="form-control" maxlength="15" v-model="model.articulo.articulo" :disabled="!alta" />
                            <ErrorMessage name="articulo" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-2">
                            <label for="marca" class="form-label">Marca:</label>
                        </div>
                        <div class="col-md-10">
                            <Field name="marca" id="marca" type="text" class="form-control" maxlength="15" v-model="model.articulo.marca" :disabled="!alta" />
                            <ErrorMessage name="marca" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-2">
                            <label for="modelo" class="form-label">Modelo:</label>
                        </div>
                        <div class="col-md-10">
                            <Field name="modelo" id="modelo" type="text" class="form-control" maxlength="20" v-model="model.articulo.modelo" :disabled="!alta" />
                            <ErrorMessage name="modelo" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-2">
                            <label for="id_departamento" class="form-label">Departamento:</label>
                        </div>
                        <div class="col-md-10">
                            <Field as="select" name="id_departamento" id="id_departamento" class="form-select" v-model="model.articulo.id_departamento" :disabled="!alta" @change="cargarClases">
                                <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento.id">{{ departamento.nombre }} </option>
                            </Field>
                            <ErrorMessage name="id_departamento" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-2">
                            <label for="id_clase" class="form-label">Clase:</label>
                        </div>
                        <div class="col-md-10">
                            <Field as="select" name="id_clase" id="id_clase" class="form-select" :disabled="!departamentoSelected" v-model="model.articulo.id_clase" @change="cargarFamilias">
                                <option v-for="clase in clases" :key="clase.id" :value="clase.id">{{ clase.nombre}} </option>
                            </Field>
                            <ErrorMessage name="id_clase" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-2">
                            <label for="id_familia" class="form-label">Familia:</label>
                        </div>
                        <div class="col-md-10">
                            <Field as="select" name="id_familia" id="id_familia" class="form-select" :disabled="!claseSelected" v-model="model.articulo.id_familia">
                                <option v-for="familia in familias" :key="familia.id" :value="familia.id">{{ familia.nombre}} </option>
                            </Field>
                            <ErrorMessage name="id_familia" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-2">
                            <label for="stock" class="form-label">Stock:</label>
                        </div>
                        <div class="col-md-4">
                            <Field name="stock" id="stock" type="number" class="form-control" maxlength="9" v-model="model.articulo.stock" @keypress="validateInputNumber" :disabled="!alta"/>
                            <ErrorMessage name="stock" class="errorValidacion"/>
                        </div>
                        <div class="col-md-2">
                            <label for="cantidad" class="form-label">Cantidad:</label>
                        </div>
                        <div class="col-md-4">
                            <Field name="cantidad" id="cantidad" type="number" class="form-control" maxlength="9" v-model="model.articulo.cantidad" @keypress="validateInputNumber" :disabled="!alta"/>
                            <ErrorMessage name="cantidad" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-2">
                            <label for="fecha_alta" class="form-label">Fecha Alta:</label>
                        </div>
                        <div class="col-md-4">
                            <Field name="fecha_alta" id="fecha_alta" type="date" class="form-control" :disabled="true" v-model="model.articulo.fecha_alta"/>
                            <ErrorMessage name="fecha_alta" class="errorValidacion"/>
                        </div>
                        <div class="col-md-2">
                            <label for="fecha_baja" class="form-label">Fecha Baja:</label>
                        </div>
                        <div class="col-md-4">
                            <Field name="fecha_baja" id="fecha_baja" type="date" class="form-control" :disabled="true" v-model="model.articulo.fecha_baja"/>
                            <ErrorMessage name="fecha_baja" class="errorValidacion"/>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button v-if="alta && !cambio" type="submit" class="btn btn-primary me-2">Guardar</button>
                        <button v-if="actualizar" type="submit" class="btn btn-success me-2">Confirmar</button>
                        <button v-if="cambio && !actualizar" @click.prevent="botonActualizar" class="btn btn-secondary me-2">Actualizar</button>
                        <button v-if="cambio" @click.prevent="eliminarArticulo" class="btn btn-danger">Eliminar</button>
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
            const validationSchema = toTypedSchema(
                zod.object({
                    sku: zod.number().min(1, 'El SKU es obligatorio y debe ser un número positivo'),
                    articulo: zod.string().max(15, 'El nombre del artículo no puede tener más de 15 caracteres').min(1, 'El artículo es obligatorio'),
                    marca: zod.string().max(15, 'La marca no puede tener más de 15 caracteres').min(1, 'La marca es obligatoria'),
                    modelo: zod.string().max(20, 'El modelo no puede tener más de 20 caracteres').min(1, 'El modelo es obligatorio'),
                    id_departamento: zod.string().min(1, 'El departamento es obligatorio'),
                    id_clase: zod.string().min(1, 'La clase es obligatoria'),
                    id_familia: zod.string().min(1, 'La familia es obligatoria'),
                    stock: zod.number().min(1, 'El stock es obligatorio y debe ser un número positivo'),
                    cantidad: zod.number().min(1, 'La cantidad es obligatoria y debe ser un número positivo'),
                    fecha_alta: zod.string().min(1, 'La fecha de alta es obligatoria'),
                    fecha_baja: zod.string().min(1, 'La fecha de baja es obligatoria')
                })
            );      
            return{
                validationSchema,
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
                        id_departamento: '',
                        id_clase: '',
                        id_familia: '',
                        stock: '',
                        cantidad: '',
                        fecha_alta: new Date().toISOString().split('T')[0],
                        fecha_baja: '1900-01-01',
                    }
                }
            }
        },
        methods:{
            checked(){
                if (this.model.articulo.cantidad > this.model.articulo.stock) {
                    alert('La cantidad no puede ser mayor que el stock disponible.');
                    return;
                }
                if(this.model.articulo.descontinuado == 1){
                    this.model.articulo.fecha_baja = new Date().toISOString().split('T')[0];
                }
                if(this.alta && !this.actualizar){
                    this.crearArticulo();
                }
                if(this.actualizar && this.alta){
                    this.actualizarArticulo();
                }
            },
            crearArticulo(){
                try {
                    apiclient.articulos.crearArticulo(this.model.articulo)
                    .then(res =>{
                        console.log(this.model);
                        alert('Artículo creado exitosamente.');
                    });
                } catch (error) {
                    console.error(error)
                }
                this.limpiar();
            },
            actualizarArticulo(){
                try {
                    apiclient.articulos.actualizarArticulo(this.model.articulo)
                    .then(res =>{
                        console.log(this.model);
                        alert('Artículo actualizado exitosamente.');
                    });
                } catch (error) {
                    console.error(error)
                }
                this.limpiar();
            },
            eliminarArticulo() {
                if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
                    try {
                        apiclient.articulos.eliminarArticulo(this.model.articulo.sku)
                            .then(res => {
                                console.log(this.model);
                                alert('Artículo eliminado exitosamente.');
                            });
                    } catch (error) {
                        console.error(error);
                        alert('Error al eliminar el artículo.');
                    }
                    this.limpiar();
                } else {
                    alert('Eliminación cancelada.');
                }
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
                apiclient.dcf.getClaseByDepartamentoId(this.model.articulo.id_departamento).then(res =>{
                    this.clases = res.data.clase;
                });
            },
            getFamilias(){
                apiclient.dcf.getFamiliasByClase_DepartamentoId(
                    this.model.articulo.id_clase, 
                    this.model.articulo.id_departamento
                ).then(res =>{
                    this.familias = res.data.familia;
                });
            },
            cargarClases(){
                this.model.articulo.id_clase = '';
                this.model.articulo.id_familia = '';
                this.claseSelected = false;
                this.getClases();
                this.departamentoSelected = true;
            },
            cargarFamilias(){
                this.model.articulo.id_familia = '';
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
                const skuEvent = parseInt(event.target.value);
                this.limpiar();
                this.model.articulo.sku = skuEvent;
                this.getDepartamentos();
                this.departamentoSelected = false;
                this.claseSelected = false;
                apiclient.articulos.getArticuloBySku(this.model.articulo.sku).then(res =>{
                    if(res.data.articulo.length > 0){
                        this.cambio = true;
                        this.alta = false;
                        this.model.articulo = res.data.articulo[0];
                        this.model.articulo.fecha_alta = res.data.articulo[0].fecha_alta.split('T')[0];
                        this.model.articulo.fecha_baja = res.data.articulo[0].fecha_baja.split('T')[0];
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
                    id_departamento: '',
                    id_clase: '',
                    id_familia: '',
                    stock: '',
                    cantidad: '',
                    fecha_alta: new Date().toISOString().split('T')[0],
                    fecha_baja: '1900-01-01',
                }
                this.alta = false;
                this.cambio = false;
                this.actualizar = false;
                this.departamentoSelected = false;
                this.claseSelected = false;
                this.$refs.form.resetForm();
            }
        }
    }
</script>

<style scoped>
.errorValidacion{
    color: red;
}
template{
    background-color: #adacac;
}
</style>
