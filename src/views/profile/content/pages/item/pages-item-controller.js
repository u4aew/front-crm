import BaseContentItem from '@/views/base/content/base-content-item'

export default {
  mixins: [BaseContentItem],
  data () {
    return {
      myHTML: '',
      sid: '',
      parentCategory: {
        id: null, name: 'Не выбрано'
      }
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
      this.$content.pages.updatePage(formData)
    },
    save (formData) {
      this.$content.pages.createPage(formData)
    },
    submit () {
      const formData = {
        name: new FormData(this.$refs.form).get('name'),
        slug: new FormData(this.$refs.form).get('slug'),
        sid: new FormData(this.$refs.form).get('sid'),
        metaTitle: new FormData(this.$refs.form).get('metaTitle'),
        metaKeywords: new FormData(this.$refs.form).get('metaKeywords'),
        metaDescription: new FormData(this.$refs.form).get('metaDescription'),
        content: this.myHTML
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
      // const categoryModel = await this.$shop.categories.getCategory(this.$route.params.id)
      // this.setData(categoryModel)
      // this.parentCategory = { id: categoryModel.getParentId(), name: categoryModel.getName() }
    }
  }
}
