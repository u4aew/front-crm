import BaseContentItem from '@/views/base/content/base-content-item'

export default {
  mixins: [BaseContentItem],
  data () {
    return {
      price: null,
      parentCategory: {
        id: null, name: 'Не выбрано'
      },
      categories: [{ id: null, name: 'Не выбрано' }]
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
    if (this.edit) {
      const categoryModel = await this.$shop.products.getProduct(this.$route.params.id)
      this.setData(categoryModel)
    }
  }
}
