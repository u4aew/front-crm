import BaseContentItem from '@/views/base/content/base-content-item'

export default {
  mixins: [BaseContentItem],
  data () {
    return {
      price: null,
      categories: [],
      category: {},
      brands: [],
      brand: {}
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

    this.category = this.categories[0]
    this.brand = this.brands[0]

    if (this.edit) {
      const categoryModel = await this.$shop.products.getProduct(this.$route.params.id)
      this.setData(categoryModel)
    }
  }
}
