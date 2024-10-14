<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-custom" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand">
          <RouterLink class="navbar-brand d-flex align-items-center" to="/">
            <img src="../src/recursos/coppel_logo.png" alt="">
          </RouterLink>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <button class="navbar-brand btn btn-success" @click="exportCSV">
                <Icon icon="teenyicons:csv-outline"></Icon> Export CSV
              </button>
            </li>
          </ul>
        </div>
    </nav>
  </header>
  <RouterView />
</template>

<script>
  import { Icon } from '@iconify/vue';
  import apiclient from './apiclient';
  export default {
  components: {
    Icon,
  },
  data() {
    return {
      data: [],
    };
  },
  methods:{
    exportCSV() {
      apiclient.articulos.exportCSV().then((response) => {
        this.data = response.data.articulo;

        const items = this.data;
        if (items.length === 0) {
          alert("No hay datos para exportar."); 
          return;
        }

        const replacer = (key, value) => (value === null ? '' : value);
        const header = Object.keys(items[0]);
        let csv = items.map((row) =>
          header
            .map((fieldName) => JSON.stringify(row[fieldName], replacer))
            .join(',')
        );
        csv.unshift(header.join(','));
        csv = csv.join('\r\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'Articulos.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }).catch((error) => {
        console.error("Error al obtener los datos:", error); 
      });
    },

  }
}
</script>

<style scoped>
img {
  width: 260px;
  height: 50px;
}
.navbar-custom {
  background-color: rgb(254, 221, 53);
}
</style>