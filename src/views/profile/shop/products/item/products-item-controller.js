import Helper from '@/core/utils/helper'
import BaseContentItem from '@/views/base/content/base-content-item'

const REQUIRED_PRODUCT_OPTIONS_PROPS = ['title', 'available', 'price', 'id', 'oldTitle', 'idXML', 'priceOld', 'major']
export default {
  mixins: [BaseContentItem],
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      brand: {},
      brands: [],
      dialog: false,
      category: {},
      categories: [],
      typeProduct: null,
      typesProduct: [],
      productOptions: [],
      productOption: {},
      productOptionEdit: null,
      currentTypeProduct: null
    }
  },
  methods: {
    // Установка информации из модели
    setData (model) {
      this.id = model.getId()
      this.slug = model.getSlug()
      this.name = model.getName()
      this.image = model.getImage()
      this.description = model.getDescription()
      this.shortDescription = model.getShortDescription()
      this.metaTitle = model.getMetaTitle()
      this.metaKeywords = model.getMetaKeywords()
      this.metaDescription = model.getMetaDescription()
      this.category = { id: model.getCategory().getId(), name: model.getCategory().getName() }
      this.brand = { id: model.getBrand().getId(), name: model.getBrand().getName() }
      this.currentTypeProduct = { id: model.getType().getId(), name: model.getType().getName() }
      this.productOptions = model.getProductOptions()
      this.changeTypeProduct(this.currentTypeProduct)
    },
    // Обновление продукта
    update (formData) {
      formData.append('id', this.id)
      if (this.$refs.image) {
        if (!this.$refs.image.isDirty) {
          formData.append('removeImage', true)
        }
      }
      this.$shop.products.updateProduct(formData)
    },
    // Сохранение продукта
    save (formData) {
      this.$shop.products.createProduct(formData)
    },
    // Отмена редактирования комплектации продукта
    cancelEditOption () {
      this.dialog = false
      this.productOptionEdit = null
    },
    // Показ диалога редактирование комплектации
    showEditProductOption (title) {
      this.productOptionEdit = {}
      const option = this.productOptions.find(item => item.title === title)
      this.productOptionEdit.oldTitle = option.title
      this.productOptionEdit.title = option.title
      this.productOptionEdit.id = option.id
      this.productOptionEdit.price = option.price
      this.productOptionEdit.priceOld = option.priceOld
      this.productOptionEdit.major = option.major
      this.productOptionEdit.idXML = option.idXML
      this.productOptionEdit.available = option.available
      option.attributes.forEach((item) => {
        this.productOptionEdit[item.attributeId] = {
          value: item.value,
          id: item.id
        }
      })
      this.dialog = true
    },
    // Изменение типа продукта
    async changeTypeProduct (value) {
      this.typeProduct = await this.$shop.typeProducts.getTypeProduct(value.id)
      this.productOption.title = null
      this.productOption.price = null
      this.productOption.major = false
      this.productOption.idXML = 0
      this.productOption.priceOld = 0
      this.productOption.available = false
      this.typeProduct.getAttributes().forEach((item) => {
        this.productOption[item.getId()] = ''
      })
    },
    // Нормализация контекста выпадающих списков
    normalizeOptionsRaw (value) {
      return value.split(/\n/)
    },
    // Удаление комплектации продукта
    async removeProductOption (title) {
      const productOption = this.productOptions.find(item => item.title === title)
      try {
        await this.$shop.products.deleteProductOption(productOption.id)
        this.productOptions = this.productOptions.filter(item => item.title !== title)
      } catch (e) {
        // do noting
      }
    },
    // Сохранение комплектации продукта
    async saveEditOption () {
      const result = {
        title: null,
        priceOld: 0,
        idXMl: 0,
        major: false,
        available: false,
        attributes: []
      }

      for (let key in this.productOptionEdit) {
        if (REQUIRED_PRODUCT_OPTIONS_PROPS.includes(key)) {
          if (!Helper.isDefined(this.productOptionEdit[key])) {
            alert(`Поле ${key} не заполнено`)
            return
          }
          if (key === 'title') {
            if (Helper.isDefined(this.productOptions
              .filter(item => item.title !== this.productOptionEdit.oldTitle)
              .find(item => item.title === this.productOptionEdit[key].value))) {
              alert(`Такое название уже существует`)
              return
            }
          }
          result[key] = this.productOptionEdit[key]
        } else {
          result.id = this.productOptionEdit.id
          result.attributes.push({
            attributeId: key,
            value: this.productOptionEdit[key].value,
            id: this.productOptionEdit[key].id
          })
        }
      }
      try {
        const productOption = result
        productOption.attributes = JSON.stringify(productOption.attributes)
        await this.$shop.products.updateProductOption(productOption)
        const opt = this.productOptions.find(item => item.title === this.productOptionEdit.oldTitle)
        opt.title = result.title
        opt.id = result.id
        opt.price = result.price
        opt.available = result.available
        opt.priceOld = result.priceOld
        opt.idXML = result.idXML
        opt.major = result.major
        opt.attributes = JSON.parse(result.attributes)
        this.productOptionEdit = null
        this.dialog = false
      } catch (e) {
        // do noting
      }
    },
    async addOption () {
      const result = {
        title: null,
        price: null,
        priceOld: 0,
        available: false,
        major: false,
        idXML: 0,
        attributes: []
      }
      for (let key in this.productOption) {
        if (REQUIRED_PRODUCT_OPTIONS_PROPS.includes(key)) {
          if (!Helper.isDefined(this.productOption[key])) {
            alert(`Поле ${key} не заполнено`)
            return
          }
          if (key === 'title') {
            if (Helper.isDefined(this.productOptions.find(item => item.title === this.productOption[key]))) {
              alert(`Такое название уже существует`)
              return
            }
          }
          result[key] = this.productOption[key]
        } else {
          result.attributes.push({ attributeId: key, value: this.productOption[key] })
        }
      }
      try {
        const productOption = { ...result, ...{ productId: this.id } }
        productOption.attributes = JSON.stringify(productOption.attributes)
        const productOptionModel = await this.$shop.products.createProductOption(productOption)
        this.productOptions.push(productOptionModel)
      } catch (e) {
        // to noting
      }
    },
    submit () {
      const formData = new FormData(this.$refs.form)
      formData.append('category', this.category.id)
      formData.append('brand', this.brand.id)
      formData.append('type', this.currentTypeProduct.id)
      if (this.edit) {
        this.update(formData)
      } else {
        this.save(formData)
      }
    }
  },
  async beforeMount () {
    const categoriesModel = await this.$shop.categories.getCategories()
    categoriesModel.getItems().forEach((item) => {
      this.categories.push({ id: item.getId(), name: item.getName() })
    })

    const brandsModel = await this.$shop.brands.getBrands()
    brandsModel.getItems().forEach((item) => {
      this.brands.push({ id: item.getId(), name: item.getName() })
    })

    const typesModel = await this.$shop.typeProducts.getTypeProducts()
    typesModel.getItems().forEach((item) => {
      this.typesProduct.push({ id: item.getId(), name: item.getName() })
    })

    this.category = this.categories[0]
    this.brand = this.brands[0]

    if (this.edit) {
      const productModel = await this.$shop.products.getProduct(this.$route.params.id)
      this.setData(productModel)
    }
  }
}
