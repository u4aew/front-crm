import BaseContentItem from '@/views/base/content/base-content-item'

export default {
  mixins: [BaseContentItem],
  methods: {
    update () {
      const formData = new FormData(this.$refs.form)
      formData.append('id', this.id)

      // todo Возможно нужно пересмотреть реализацию
      if (this.$refs.image) {
        if (!this.$refs.image.isDirty) {
          formData.append('removeImage', true)
        }
      }
      this.$shop.categories.updateCategory(formData)
    },
    save () {
      const formData = new FormData(this.$refs.form)
      this.$shop.categories.createCategory(formData)
    },
    submit () {
      if (this.edit) {
        this.update()
      } else {
        this.save()
      }
    }
  },
  async beforeMount () {
    if (this.edit) {
      const model = await this.$shop.categories.getCategory(this.$route.params.id)
      this.setData(model)
    }
  }
}
