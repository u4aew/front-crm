import BaseContentItem from '@/views/base/content/base-content-item'

export default {
  mixins: [BaseContentItem],
  data () {
    return {
      parentCategory: {
        id: null, name: 'Не выбрано'
      },
      categories: [{ id: null, name: 'Не выбрано' }]
    }
  },
  methods: {
    update (formData) {
      formData.append('id', this.id)

      // todo Возможно нужно пересмотреть реализацию
      if (this.$refs.image) {
        if (!this.$refs.image.isDirty) {
          formData.append('removeImage', true)
        }
      }
      this.$shop.categories.updateCategory(formData)
    },
    save (formData) {
      this.$shop.categories.createCategory(formData)
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
      const categoryModel = await this.$shop.categories.getCategory(this.$route.params.id)
      this.setData(categoryModel)
      this.parentCategory = { id: categoryModel.getParentId(), name: categoryModel.getName() }
    }
    const categoriesModel = await this.$shop.categories.getCategories()
    categoriesModel.getItems().forEach((item) => {
      if (item.getId() !== this.id) {
        this.categories.push({ id: item.getId(), name: item.getName() })
      }
    })
  }
}
