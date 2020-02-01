import BaseContentItem from '@/views/base/content/base-content-item'

export default {
  mixins: [BaseContentItem],
  data () {
    return {
      required: false,
      isFilter: false,
      optionRaw: null,
      unit: null,
      type: {
        name: 'Текст',
        id: 1
      },
      types: [{
        name: 'Текст',
        id: 1
      }, {
        name: 'Выпадающий список',
        id: 2
      },
        {
          name: 'Чекбокс',
          id: 3
        },
        {
          name: 'Число',
          id: 4
        }]
    }
  },
  computed: {
    viewOptionsRaw () {
      return this.type.id === 2
    },
    vieUnit () {
      return this.type.id === 4
    }
  },
  methods: {
    setData (model) {
      this.id = model.getId()
      this.optionRaw = model.getOptionRaw()
      this.name = model.getName()
      this.type = model.getType()
      this.isFilter = model.getIsFilter()
      this.required = model.getRequired()
      this.unit = model.getUnit()
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
        name: new FormData(this.$refs.form).get('name'),
        optionRaw: new FormData(this.$refs.form).get('optionRaw'),
        unit: new FormData(this.$refs.form).get('unit'),
        isFilter: this.isFilter,
        required: this.required,
        type: this.type.id
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
