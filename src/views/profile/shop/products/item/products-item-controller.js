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
      options: [],
      option: {},
      typeProduct: null,
      dialog: false
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
    },
    update (formData) {
      formData.append('id', this.id)
      // todo Возможно нужно пересмотреть реализацию
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
    normalizeOptionsRaw (value) {
      return value.split(/\n/)
    },
    async changeTypeProduct (value) {
      this.typeProduct = await this.$shop.typeProducts.getTypeProduct(value.id)
      this.option.title = null
      this.option.price = null
      this.option.available = false
      this.typeProduct.getAttributes().forEach((item) => {
        this.option[item.getId()] = ''
      })
    },
    removeOption (title) {
      this.options = this.options.filter(item => item.title !== title)
    },
    addOption () {
      const result = {
        title: null,
        price: null,
        available: false,
        attributes: []
      }
      for (let key in this.option) {
        if (key === 'title' || key === 'available' || key === 'price') {
          console.log(this.option[key])
          if (!Helper.isDefined(this.option[key])) {
            alert(`Поле ${key} не заполнено`)
            return
          }
          if (key === 'title') {
            if (Helper.isDefined(this.options.find(item => item.title === this.option[key]))) {
              alert(`Такое название уже существует`)
              return
            }
          }
          result[key] = this.option[key]
        } else {
          result.attributes.push({ attributeId: key, value: this.option[key] })
        }
      }
      this.options.push(result)
    },
    submit () {
      const formData = new FormData(this.$refs.form)
      formData.append('category', this.category.id)
      formData.append('brand', this.brand.id)
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
      const categoryModel = await this.$shop.products.getProduct(this.$route.params.id)
      this.setData(categoryModel)
    }
  }
}
