<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container class="pa-0">
    <form method="post" enctype="multipart/form-data" ref="form" @submit.prevent="submit">
      <v-row>
        <v-col>
          <v-tabs class="pa-2">
            <v-tab>Базовая информация</v-tab>
            <v-tab>Атрибуты</v-tab>
            <v-tab>SEO</v-tab>
            <v-tab-item>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <template v-if="image">
                      <v-row align="center">
                        <v-col cols="8">
                          <v-text-field
                            v-model="image"
                            label="ID Изображения"
                            disabled
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-btn @click="removeImage" block color="primary" dark class="ma-1">Удалить</v-btn>
                        </v-col>
                      </v-row>
                    </template>
                    <template v-else>
                      <v-file-input
                        ref="image"
                        label="Обложка"
                        name="image"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Выберите изображение"
                      />
                    </template>
                    <v-text-field
                      v-model="name"
                      name="name"
                      :error-messages="nameErrors"
                      label="Заголовок"
                      required
                      @input="$v.name.$touch()"
                      @blur="$v.name.$touch()"
                    />
                    <v-text-field
                      :value="nameTranslite"
                      name="slug"
                      required
                      label="Алиас"
                    />
                    <v-text-field
                      v-model="price"
                      name="price"
                      required
                      label="Цена"
                    />
                    <v-select
                      v-model="category"
                      :items="categories"
                      item-text="name"
                      item-value="id"
                      label="Родительская категория"
                      return-object
                      single-line
                    />
                    <v-textarea
                      rows="2"
                      name="description"
                      v-model="description"
                      label="Описание"
                    />
                    <v-textarea
                      rows="2"
                      name="shortDescription"
                      v-model="shortDescription"
                      label="Короткое описание"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-select
                      v-model="parentCategory"
                      :items="categories"
                      item-text="name"
                      item-value="id"
                      label="Родительская категория"
                      return-object
                      single-line
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container>
                <v-col cols="6">
                  <v-text-field
                    v-model="metaTitle"
                    name="metaTitle"
                    label="Заголовок"
                  />
                  <v-text-field
                    v-model="metaKeywords"
                    name="metaKeywords"
                    label="Ключевые слова"
                  />
                  <v-text-field
                    v-model="metaDescription"
                    name="metaDescription"
                    label="Описание"
                  />
                </v-col>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row>
        <v-container class="text-right">
          <v-btn to="/products" class="ma-1">Отмена</v-btn>
          <v-btn color="primary" type="submit" dark class="ma-1">Сохранить</v-btn>
        </v-container>
      </v-row>
    </form>
  </v-container>

</template>

<script>
    import ProductsItemController from './products-item-controller'

    export default {
        name: 'CategoriesItem',
        mixins: [ProductsItemController]
    }
</script>
