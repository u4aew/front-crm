import BaseContentItem from '@/views/base/content/base-content-item'

export default {
  mixins: [BaseContentItem],
  methods: {
    setData (model) {
      this.id = model.getId()
      this.name = model.getName()
    },
    update (formData) {
      formData.id = this.id
      this.$shop.typeProducts.updateTypeProduct(formData)
    },
    save (formData) {
      this.$shop.typeProducts.createTypeProduct(formData)
    },
    submit () {
      const formData = {
        name: new FormData(this.$refs.form).get('name')
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
      const typeProductModel = await this.$shop.typeProducts.getTypeProduct(this.$route.params.id)
      this.setData(typeProductModel)
    }
  }
}
