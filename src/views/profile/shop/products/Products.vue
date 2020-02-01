<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="12" md="12" class="text-right">
        <v-btn to="/products/create" color="primary" dark class="mb-2">Добавить</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="items.length">
      <v-col cols="12" sm="12" md="12">
        <v-data-table
          :headers="headers"
          :items="items"
          class="elevation-1">
          <template v-slot:item.action="{ item }">
            <router-link style="text-decoration: none" :to="`/products/${item.getId()}`">
              <v-icon
                small
                class="mr-2">
                mdi-table-edit
              </v-icon>
            </router-link>
            <v-icon
              @click="deleteItem(item.getId())"
              small>
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="text-center">
        Данные отсутствуют
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import { VIEWS } from '@/views/names'
    import ProductsController from './products-controller'

    export default {
        name: VIEWS.profile.products.index.name,
        mixins: [ProductsController]
    }
</script>
