import BaseContentItem from '@/views/base/content/base-content-item'

export default {
  mixins: [BaseContentItem],
  data () {
    return {
      price: null,
      parentCategory: {
        id: null, name: 'Не выбрано'
      },
      categories: [],
      category: {}
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
      if (this.parentCategory.id) {
        formData.append('parentId', this.parentCategory.id)
      }
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
    this.category = this.categories[0]
    if (this.edit) {
      const categoryModel = await this.$shop.products.getProduct(this.$route.params.id)
      this.setData(categoryModel)
    }
  }
}
