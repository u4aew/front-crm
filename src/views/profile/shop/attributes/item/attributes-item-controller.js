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
      this.$shop.attributes.updateAttribute(formData)
    },
    save (formData) {
      this.$shop.attributes.createAttribute(formData)
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
      const model = await this.$shop.attributes.getAttribute(this.$route.params.id)
      this.setData(model)
    }
  }
}
