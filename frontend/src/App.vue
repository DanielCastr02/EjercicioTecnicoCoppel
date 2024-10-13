<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-custom" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <RouterLink class="navbar-brand" to="/">
            <img src="../src/recursos/coppel.png" />
          </RouterLink>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<script>

</script>
<style scoped>
img {
  width: 70px;
}
.navbar-custom {
  background-color: #e70000;
  border-radius: 5px;
}
</style>
