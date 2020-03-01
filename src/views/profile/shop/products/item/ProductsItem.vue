<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container class="pa-0">
    <v-row>
      <v-col>
        <v-tabs class="pa-2">
          <v-tab>Базовая информация</v-tab>
          <v-tab :disabled="!edit">Комплектации</v-tab>
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
                    <v-select
                      @change="changeTypeProduct"
                      v-model="currentTypeProduct"
                      :items="typesProduct"
                      item-text="name"
                      item-value="id"
                      label="Тип товара"
                      return-object
                      single-line
                    />
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
                    <v-row>
                      <v-col cols="12">
                        <div class="headline">SEO Настройки</div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="metaTitle"
                          name="metaTitle"
                          label="Заголовок"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="metaKeywords"
                          name="metaKeywords"
                          label="Ключевые слова"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="metaDescription"
                          name="metaDescription"
                          label="Описание"
                        />
                      </v-col>
                    </v-row>
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
                <v-col cols="12">
                  <v-row v-if="typeProduct">
                    <v-dialog v-model="dialog" persistent max-width="600px">
                      <v-card>
                        <v-card-title>
                          <span class="headline">Редактирование</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row v-if="productOptionEdit">
                              <v-col cols="12">
                                <v-text-field
                                  name="nameOptionEdit"
                                  required
                                  v-model="productOptionEdit.title"
                                  label="Название комплектации"
                                />
                              </v-col>
                              <template v-for="(item, key) in typeProduct.getAttributes()">
                                <v-col cols="12" :key="key" v-if="item.getTypeId() === 1">
                                  <v-text-field
                                    v-model="productOptionEdit[item.getId()].value"
                                    :name="`attribute ${item.getId()}`"
                                    :required="item.getRequired()"
                                    :label="item.getName()"
                                  />
                                </v-col>
                                <v-col cols="12" :key="key" v-if="item.getTypeId() === 2">
                                  <v-select
                                    v-model="productOptionEdit[item.getId()].value"
                                    :name="`attribute ${item.getId()}`"
                                    :required="item.getRequired()"
                                    :label="item.getName()"
                                    :items="normalizeOptionsRaw(item.getOptionRaw())"
                                  />
                                </v-col>
                                <v-col cols="12" :key="key" v-if="item.getTypeId() === 3">
                                  <v-checkbox
                                    v-model="productOptionEdit[item.getId()].value"
                                    :name="`attribute ${item.getId()}`"
                                    :required="item.getRequired()"
                                    :label="item.getName()"
                                  />
                                </v-col>
                                <v-col cols="12" :key="key" v-if="item.getTypeId() === 4">
                                  <v-row align="center">
                                    <v-col cols="10">
                                      <v-text-field
                                        v-model="productOptionEdit[item.getId()].value"
                                        :name="`attribute ${item.getId()}`"
                                        :required="item.getRequired()"
                                        :label="item.getName()"
                                      />
                                    </v-col>
                                    <v-col cols="2">{{item.getUnit()}}</v-col>
                                  </v-row>
                                </v-col>
                              </template>
                              <v-col cols="12">
                                <v-text-field
                                  name="idxmlEdit"
                                  v-model="productOptionEdit.idXML"
                                  hide-details
                                  single-line
                                  type="number"
                                  label="idXML"
                                />
                              </v-col>
                              <v-col cols="6">
                                <v-text-field
                                  name="priceEdit"
                                  v-model="productOptionEdit.price"
                                  hide-details
                                  single-line
                                  type="number"
                                  label="Цена"
                                />
                              </v-col>
                              <v-col cols="6">
                                <v-text-field
                                  name="priceOldEdit"
                                  v-model="productOptionEdit.priceOld"
                                  hide-details
                                  single-line
                                  type="number"
                                  label="Старая цена"
                                />
                              </v-col>
                              <v-row>
                                <v-col cols="3">
                                  <v-checkbox
                                    name="availableEdit"
                                    v-model="productOptionEdit.available"
                                    label="Наличие"
                                  />
                                </v-col>
                                <v-col cols="8">
                                  <v-checkbox
                                    name="majorEdit"
                                    v-model="productOptionEdit.major"
                                    label="Главная комплектация"
                                  />
                                </v-col>
                              </v-row>

                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions class="pb-10">
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="cancelEditOption">Закрыть</v-btn>
                          <v-btn color="blue darken-1" dark @click="saveEditOption">Сохранить</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-col cols="6">
                      <v-row>
                        <v-col cols="12">
                          <div class="headline">Базовые характеристики</div>
                        </v-col>
                      </v-row>
                      <v-text-field
                        name="nameOption"
                        v-model="productOption.title"
                        label="Название комплектации"
                      />
                      <v-text-field
                        name="price"
                        v-model="productOption.price"
                        hide-details
                        single-line
                        type="number"
                        label="Цена"
                      />
                      <v-text-field
                        name="price"
                        v-model="productOption.priceOld"
                        hide-details
                        single-line
                        type="number"
                        label="Старая цена"
                      />
                      <v-text-field
                        name="idxml"
                        v-model="productOption.idXML"
                        hide-details
                        single-line
                        type="number"
                        label="idXML"
                      />
                      <v-row>
                        <v-col cols="3">
                          <v-checkbox
                            name="available"
                            v-model="productOption.available"
                            label="Наличие"
                          />
                        </v-col>
                        <v-col cols="8">
                          <v-checkbox
                            name="majorEdit"
                            v-model="productOption.major"
                            label="Главная комплектация"
                          />
                        </v-col>
                      </v-row>
                      <v-btn @click="addOption" color="primary" dark class="ma-1">Добавить комплектацию</v-btn>
                    </v-col>
                    <v-col cols="6">
                      <!-- 1 - Текст-->
                      <!-- 2 - Выпадающий список-->
                      <!-- 3 - Чебокс-->
                      <!-- 4 - Число-->
                      <v-row>
                        <v-col cols="12">
                          <div class="headline">Атрибуты товара</div>
                        </v-col>
                      </v-row>
                      <template v-for="(item, key) in typeProduct.getAttributes()">
                        <div :key="key" v-if="item.getTypeId() === 1">
                          <v-text-field
                            v-model="productOption[item.getId()]"
                            :name="`attribute ${item.getId()}`"
                            :required="item.getRequired()"
                            :label="item.getName()"
                          />
                        </div>
                        <div :key="key" v-if="item.getTypeId() === 2">
                          <v-select
                            v-model="productOption[item.getId()]"
                            :name="`attribute ${item.getId()}`"
                            :required="item.getRequired()"
                            :label="item.getName()"
                            :items="normalizeOptionsRaw(item.getOptionRaw())"
                          />
                        </div>
                        <div :key="key" v-if="item.getTypeId() === 3">
                          <v-checkbox
                            v-model="productOption[item.getId()]"
                            :name="`attribute ${item.getId()}`"
                            :required="item.getRequired()"
                            :label="item.getName()"
                          />
                        </div>
                        <div :key="key" v-if="item.getTypeId() === 4">
                          <v-row align="center">
                            <v-col cols="10">
                              <v-text-field
                                v-model="productOption[item.getId()]"
                                :name="`attribute ${item.getId()}`"
                                :required="item.getRequired()"
                                :label="item.getName()"
                              />
                            </v-col>
                            <v-col cols="2">{{item.getUnit()}}</v-col>
                          </v-row>
                        </div>
                      </template>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider class="mb-10"/>
              <v-row>
                <v-col cols="12">
                  <div class="headline">Сохраненные комплектации</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <template v-for="(option, key) in productOptions">
                    <v-row :key="key" align="center">
                      <v-col cols="6">
                        {{option.title}}
                      </v-col>
                      <v-col cols="6">
                        <v-row justify="end">
                          <v-btn @click="showEditProductOption(option.title)" small color="primary" dark class="ma-1">
                            Редактировать
                          </v-btn>
                          <v-btn @click="removeProductOption(option.title)" small class="ma-1">Удалить</v-btn>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-divider :key="`divider-${key}`"/>
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
        name: 'ProductsItem',
        mixins: [ProductsItemController]
    }
</script>
