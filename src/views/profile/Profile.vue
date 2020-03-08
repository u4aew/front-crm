<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Главная</v-list-item-title>
        </v-list-item>
        <v-list-group
          prepend-icon="mdi-cart"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Магазин</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/categories/">
            <v-list-item-icon>
              <v-icon>mdi-folder</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Категории</v-list-item-title>
          </v-list-item>
          <v-list-item to="/products/">
            <v-list-item-icon>
              <v-icon>mdi-cube</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Товары</v-list-item-title>
          </v-list-item>
          <v-list-item to="/brands/">
            <v-list-item-icon>
              <v-icon>mdi-hexagon</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Бренды</v-list-item-title>
          </v-list-item>

          <v-list-item to="/attributes/">
            <v-list-item-icon>
              <v-icon>mdi-wall</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Атрибуты</v-list-item-title>
          </v-list-item>

          <v-list-item to="/type-products/">
            <v-list-item-icon>
              <v-icon>mdi-tag</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Типы товаров</v-list-item-title>
          </v-list-item>

        </v-list-group>
        <v-list-group
          prepend-icon="mdi-clipboard-multiple-outline"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Контент</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item to="/pages/">
            <v-list-item-icon>
              <v-icon>mdi-content-copy</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Страницы</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Управление контентом</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
    import ProfileController from './profile-controller'
    // components

    export default {
        name: 'profile',
        mixins: [ProfileController]
    }
</script>
