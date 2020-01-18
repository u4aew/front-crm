<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    Продукты
  </div>
</template>

<script>

  import ProductsController from './products-controller'
  // components
  export default {
    name: 'Products',
    mixins: [ProductsController]
  }
</script>
