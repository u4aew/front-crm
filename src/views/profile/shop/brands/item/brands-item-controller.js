import BaseContentItem from '@/views/base/content/base-content-item'

export default {
  mixins: [BaseContentItem],
  methods: {
    update (formData) {
      formData.append('id', this.id)
      // todo Возможно нужно пересмотреть реализацию
      if (this.$refs.image) {
        if (!this.$refs.image.isDirty) {
          formData.append('removeImage', true)
        }
      }
      this.$shop.brands.updateBrand(formData)
    },
    save (formData) {
      this.$shop.brands.createBrand(formData)
    },
    submit () {
      const formData = new FormData(this.$refs.form)
      if (this.edit) {
        this.update(formData)
      } else {
        this.save(formData)
      }
    }
  },
  async beforeMount () {
    if (this.edit) {
      const brandModel = await this.$shop.brands.getBrand(this.$route.params.id)
      this.setData(brandModel)
    }
  }
}
