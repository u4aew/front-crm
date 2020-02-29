<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container class="pa-0">
    <v-row>
      <v-col>
        <v-tabs class="pa-2">
          <v-tab>Базовая информация</v-tab>
          <v-tab>Комплектации</v-tab>
          <v-tab-item>
            <form method="post" enctype="multipart/form-data" ref="form" @submit.prevent="submit">
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
                    <v-select
                      v-model="category"
                      :items="categories"
                      item-text="name"
                      item-value="id"
                      label="Родительская категория"
                      return-object
                      single-line
                    />
                    <v-select
                      v-model="brand"
                      :items="brands"
                      item-text="name"
                      item-value="id"
                      label="Бренд"
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
                  <v-col cols="6">
                    <v-text-field
                      v-model="metaTitle"
                      name="metaTitle"
                      label="SEO Заголовок"
                    />
                    <v-text-field
                      v-model="metaKeywords"
                      name="metaKeywords"
                      label="SEO Ключевые слова"
                    />
                    <v-text-field
                      v-model="metaDescription"
                      name="metaDescription"
                      label="SEO Описание"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-container class="text-right">
                    <v-btn to="/products" class="ma-1">Отмена</v-btn>
                    <v-btn color="primary" type="submit" dark class="ma-1">Сохранить</v-btn>
                  </v-container>
                </v-row>
              </v-container>
            </form>
          </v-tab-item>
          <v-tab-item>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-select
                    @change="changeTypeProduct"
                    v-model="type"
                    :items="types"
                    item-text="name"
                    item-value="id"
                    label="Тип товара"
                    return-object
                    single-line
                  />
                  <v-row v-if="typeProduct">
                    <v-col cols="12">
                      <!-- 1 - Текст-->
                      <!-- 2 - Выпадающий список-->
                      <!-- 3 - Чебокс-->
                      <!-- 4 - Число-->
                      <v-text-field
                        name="nameOption"
                        required
                        v-model="option.title"
                        label="Название комплектации"
                      />
                      <template v-for="(item, key) in typeProduct.getAttributes()">
                        <div :key="key" v-if="item.getTypeId() === 1">
                          <v-text-field
                            v-model="option[item.getId()]"
                            :name="`attribute ${item.getId()}`"
                            :required="item.getRequired()"
                            :label="item.getName()"
                          />
                        </div>
                        <div :key="key" v-if="item.getTypeId() === 2">
                          <v-select
                            v-model="option[item.getId()]"
                            :name="`attribute ${item.getId()}`"
                            :required="item.getRequired()"
                            :label="item.getName()"
                            :items="normalizeOptionsRaw(item.getOptionRaw())"
                          />
                        </div>
                        <div :key="key" v-if="item.getTypeId() === 3">
                          <v-checkbox
                            v-model="option[item.getId()]"
                            :name="`attribute ${item.getId()}`"
                            :required="item.getRequired()"
                            :label="item.getName()"
                          />
                        </div>
                        <div :key="key" v-if="item.getTypeId() === 4">
                          <v-row align="center">
                            <v-col cols="10">
                              <v-text-field
                                v-model="option[item.getId()]"
                                :name="`attribute ${item.getId()}`"
                                :required="item.getRequired()"
                                :label="item.getName()"
                              />
                            </v-col>
                            <v-col cols="2">{{item.getUnit()}}</v-col>
                          </v-row>
                        </div>
                      </template>
                      <v-text-field
                        name="price"
                        v-model="option.price"
                        label="Цена"
                      />
                      <v-checkbox
                        name="available"
                        v-model="option.available"
                        label="Наличие"
                      />
                      <v-btn @click="addOption" color="primary" dark class="ma-1">Добавить комплектацию</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <template v-for="(option, key) in options">
                    <v-row :key="key" align="center">
                      <v-col cols="8">
                        {{option.title}}
                      </v-col>
                      <v-col cols="4">
                        <v-btn @click="removeOption(option.title)" small class="ma-1">Удалить</v-btn>

                        <v-dialog v-model="dialog" persistent max-width="600px">
                          <template v-slot:activator="{ on }">
                            <v-btn small color="primary" v-on="on" dark class="ma-1">Редактировать</v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">User Profile</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="Legal first name*" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="Legal middle name"
                                                  hint="example of helper text only on focus"></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                      label="Legal last name*"
                                      hint="example of persistent helper text"
                                      persistent-hint
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-text-field label="Email*" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-text-field label="Password*" type="password" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6">
                                    <v-select
                                      :items="['0-17', '18-29', '30-54', '54+']"
                                      label="Age*"
                                      required
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="12" sm="6">
                                    <v-autocomplete
                                      :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                      label="Interests"
                                      multiple
                                    ></v-autocomplete>
                                  </v-col>
                                </v-row>
                              </v-container>
                              <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                              <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-col>
                    </v-row>
                    <v-divider :key="key"/>
                  </template>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
    import ProductsItemController from './products-item-controller'

    export default {
        name: 'CategoriesItem',
        mixins: [ProductsItemController]
    }
</script>
