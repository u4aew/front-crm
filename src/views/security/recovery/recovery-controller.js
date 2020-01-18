import baseViewController from '@/views/base/base-view-controller'

export default {
  mixins: [baseViewController],
  data () {
    return {
      fields: [
        {
          type: 'input',
          inputType: 'email',
          label: 'Логин',
          name: 'login',
          value: null,
          placeholder: 'Введите ваш e-mail',
          required: true
        }
      ],
      visibleRecoveryInfo: false
    }
  },
  methods: {
    async auth ({ fields }) {
      this.$setLoading()
      const { login } = fields
      try {
        await this.$service.security.recovery({
          login
        })
        this.visibleRecoveryInfo = true
      } catch (e) {
        this.visibleRecoveryInfo = false
        console.log(e)
      }
      this.$unsetLoading()
    }
  }
}
