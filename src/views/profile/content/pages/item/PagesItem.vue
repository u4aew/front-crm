<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container class="pa-0">
    <form method="post" enctype="multipart/form-data" ref="form" @submit.prevent="submit">
      <v-row>
        <v-col>
          <v-tabs class="pa-2">
            <v-tab>Базовая информация</v-tab>
            <v-tab>SEO</v-tab>
            <v-tab-item>
              <v-container>
                <v-row>
                  <v-col cols="6">
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
                      :value="edit ? slug : nameTranslite"
                      name="slug"
                      required
                      label="Алиас"
                    />
                    <v-text-field
                      :value="sid"
                      name="sid"
                      required
                      label="sid"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <wysiwyg v-model="myHTML"/>
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
          <v-btn to="/pages" class="ma-1">Отмена</v-btn>
          <v-btn color="primary" type="submit" dark class="ma-1">Сохранить</v-btn>
        </v-container>
      </v-row>
    </form>
  </v-container>

</template>

<script>
    import PagesItemController from './pages-item-controller'

    export default {
        name: 'CategoriesItem',
        mixins: [PagesItemController]
    }
</script>
