import Helper from '@/core/utils/helper'
import BaseContentItem from '@/views/base/content/base-content-item'

export default {
  mixins: [BaseContentItem],
  data () {
    return {
      price: null,
      categories: [],
      category: {},
      brands: [],
      brand: {},
      type: null,
      types: [],
      productOptions: [],
      productOption: {},
      typeProduct: null,
      dialog: false,
      optionEdit: null
    }
  },
  methods: {
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
      this.price = model.getPrice()
      this.category = { id: model.getCategory().getId(), name: model.getCategory().getName() }
      this.brand = { id: model.getBrand().getId(), name: model.getBrand().getName() }
      this.type = { id: model.getType().getId(), name: model.getType().getName() }
      this.productOptions = model.getProductOptions()
      this.changeTypeProduct(this.type)
    },
    update (formData) {
      formData.append('id', this.id)
      // todo нужно пересмотреть реализацию
      if (this.$refs.image) {
        if (!this.$refs.image.isDirty) {
          formData.append('removeImage', true)
        }
      }
      this.$shop.products.updateProduct(formData)
    },
    save (formData) {
      this.$shop.products.createProduct(formData)
    },
    cancelEditOption () {
      this.dialog = false
      this.optionEdit = null
    },
    showEditProductOption (title) {
      this.optionEdit = {}
      const option = this.productOptions.find(item => item.title === title)
      this.optionEdit.oldTitle = option.title
      this.optionEdit.title = option.title
      this.optionEdit.id = option.id
      this.optionEdit.price = option.price
      this.optionEdit.available = option.available
      option.attributes.forEach((item) => {
        this.optionEdit[item.attributeId] = {
          value: item.value,
          id: item.id
        }
      })
      this.dialog = true
    },
    async changeTypeProduct (value) {
      this.typeProduct = await this.$shop.typeProducts.getTypeProduct(value.id)
      this.productOption.title = null
      this.productOption.price = null
      this.productOption.available = false
      this.typeProduct.getAttributes().forEach((item) => {
        this.productOption[item.getId()] = ''
      })
    },
    normalizeOptionsRaw (value) {
      return value.split(/\n/)
    },
    async removeProductOption (title) {
      const productOption = this.productOptions.find(item => item.title === title)
      try {
        await this.$shop.products.deleteProductOption({ id: productOption.id })
        this.productOptions = this.productOptions.filter(item => item.title !== title)
      } catch (e) {
        // do noting
      }
    },
    async saveEditOption () {
      const result = {
        title: null,
        price: null,
        available: false,
        attributes: []
      }
      for (let key in this.optionEdit) {
        if (key === 'title' || key === 'available' || key === 'price' || key === 'id' || key === 'oldTitle') {
          if (!Helper.isDefined(this.optionEdit[key])) {
            alert(`Поле ${key} не заполнено`)
            return
          }
          if (key === 'title') {
            if (Helper.isDefined(this.productOptions
              .filter(item => item.title !== this.optionEdit.oldTitle)
              .find(item => item.title === this.optionEdit[key].value))) {
              alert(`Такое название уже существует`)
              return
            }
          }
          result[key] = this.optionEdit[key]
        } else {
          if (this.edit) {
            result.id = this.optionEdit.id
            result.attributes.push({ attributeId: key, value: this.optionEdit[key].value, id: this.optionEdit[key].id })
          } else {
            result.attributes.push({ attributeId: key, value: this.optionEdit[key] })
          }
        }
      }
      try {
        if (this.edit) {
          const productOption = result
          productOption.attributes = JSON.stringify(productOption.attributes)
          this.dialog = false
          await this.$shop.products.updateProductOption(productOption)
        }
        const opt = this.productOptions.find(item => item.title === this.optionEdit.oldTitle)
        opt.title = result.title
        opt.id = result.id
        opt.price = result.price
        opt.available = result.available
        opt.attributes = JSON.parse(result.attributes)
        this.optionEdit = null
      } catch (e) {
        // do noting
      }
    },
    async addOption () {
      const result = {
        title: null,
        price: null,
        available: false,
        attributes: []
      }
      for (let key in this.productOption) {
        if (key === 'title' || key === 'available' || key === 'price') {
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
        if (this.edit) {
          const productOption = { ...result, ...{ productId: this.id } }
          productOption.attributes = JSON.stringify(productOption.attributes)
          const productOptionModel = await this.$shop.products.createProductOption(productOption)
          this.productOptions.push(productOptionModel)
        } else {
          this.productOptions.push(result)
        }
      } catch (e) {
        // to noting
      }
    },
    submit () {
      const formData = new FormData(this.$refs.form)
      formData.append('category', this.category.id)
      formData.append('brand', this.brand.id)
      formData.append('type', this.type.id)
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
      this.types.push({ id: item.getId(), name: item.getName() })
    })

    this.category = this.categories[0]
    this.brand = this.brands[0]

    if (this.edit) {
      const productModel = await this.$shop.products.getProduct(this.$route.params.id)
      this.setData(productModel)
    }
  }
}
