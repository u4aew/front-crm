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
        },
        {
          type: 'input',
          inputType: 'password',
          label: 'Пароль',
          name: 'number',
          value: null,
          placeholder: 'Введите ваш пароль',
          required: true
        }
      ]
    }
  },
  methods: {
    async auth ({ fields }) {
      this.$setLoading()
      try {
        await this.$service.security.auth(fields)
        this.$pageManager.showMarket()
      } catch (e) {
        console.log('sda')
      }
      this.$unsetLoading()
    }
  }
}
