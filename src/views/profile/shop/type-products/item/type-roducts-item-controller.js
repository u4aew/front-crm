import BaseContentItem from '@/views/base/content/base-content-item'

export default {
  mixins: [BaseContentItem],
  data () {
    return {
      selected: [],
      headers: [
        {
          text: 'Атрибуты',
          align: 'left',
          sortable: false,
          value: 'name'
        }
      ],
      attributes: null
    }
  },
  methods: {
    setData (model) {
      this.id = model.getId()
      this.name = model.getName()

      model.getAttributes().forEach((item) => {
        const attr = {}
        attr.id = item.getId()
        attr.name = item.getName()
        this.selected.push(attr)
      })
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
        name: new FormData(this.$refs.form).get('name'),
        attributes: this.selected.map(item => item.id)
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
    const model = await this.$shop.attributes.getAttributes()
    this.attributes = model.getItems()
  }
}
