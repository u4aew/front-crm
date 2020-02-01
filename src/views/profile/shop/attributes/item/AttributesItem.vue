<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container class="pa-0">
    <form method="post" enctype="multipart/form-data" ref="form" @submit.prevent="submit">
      <v-row>
        <v-col>
          <v-tabs class="pa-2">
            <v-tab>Базовая информация</v-tab>
            <v-tab-item>
              <v-container>
                <v-row>
                  <v-col cols="3">
                    <v-text-field
                      v-model="name"
                      name="name"
                      :error-messages="nameErrors"
                      label="Заголовок"
                      required
                      @input="$v.name.$touch()"
                      @blur="$v.name.$touch()"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-row>
                      <v-col cols="6">
                        <v-select
                          v-model="type"
                          :items="types"
                          item-text="name"
                          item-value="id"
                          label="Тип"
                          return-object
                          single-line
                        />
                      </v-col>
                      <v-col cols="6">
                        <template v-if="vieUnit">
                          <v-text-field
                            v-model="unit"
                            name="unit"
                            label="Единица измерения"
                          />
                        </template>
                      </v-col>
                      <v-col cols="8" v-if="viewOptionsRaw">
                        <v-textarea
                          rows="5"
                          name="optionRaw"
                          v-model="optionRaw"
                          label="Каждое значение опции должно быть на новой строке."
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2" align="center">
                    <v-checkbox
                      name="required"
                      v-model="required"
                      label="Обязательный"
                    />
                  </v-col>
                  <v-col cols="2" align="center">
                    <v-checkbox
                      name="isFilter"
                      v-model="isFilter"
                      label="Фильтр"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row>
        <v-container class="text-right">
          <v-btn to="/attributes/" class="ma-1">Отмена</v-btn>
          <v-btn color="primary" type="submit" dark class="ma-1">Сохранить</v-btn>
        </v-container>
      </v-row>
    </form>
  </v-container>
</template>

<script>
    import AttributesItemController from './attributes-item-controller'
    // components
    export default {
        mixins: [AttributesItemController]
    }
</script>
