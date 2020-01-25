import { required } from 'vuelidate/lib/validators'

export default {
  props: {
    create: {
      type: Boolean
    },
    edit: {
      type: Boolean
    }
  },
  validations: {
    name: { required },
    slug: { required }
  },
  data () {
    return {
      id: null,
      slug: null,
      name: null,
      image: null,
      description: null,
      shortDescription: null,
      metaTitle: null,
      metaKeywords: null,
      metaDescription: null
    }
  },
  methods: {
    removeImage () {
      this.image = null
    },
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
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Заголовок обязательный')
      return errors
    },
    slugErrors () {
      const errors = []
      if (!this.$v.slug.$dirty) return errors
      !this.$v.slug.required && errors.push('Slug обязательный')
      return errors
    }
  }
}
