import baseViewController from '@/views/base/base-view-controller'

export default {
  mixins: [baseViewController],
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      fields: [
        {
          type: 'input',
          inputType: 'password',
          label: 'Новый пароль',
          name: 'password',
          value: null,
          placeholder: 'Введите пароль',
          required: true
        },
        {
          type: 'input',
          inputType: 'password',
          label: 'Потвердите пароль',
          name: 'passwordConfirm',
          value: null,
          placeholder: 'Введите пароль',
          required: true,
          matchesName: 'password'
        }
      ],
      visibleSuccessInfo: false,
      timer: 5,
      timerId: null
    }
  },
  methods: {
    async auth ({ fields }) {
      this.$setLoading()
      const { password, passwordConfirm } = fields
      try {
        await this.$service.security.recoveryPassword({
          password,
          passwordConfirm,
          id: this.id
        })
        this.visibleSuccessInfo = true
        this.runTimer()
      } catch (e) {
        console.log(e)
        this.visibleSuccessInfo = false
      }
      this.$unsetLoading()
    },
    runTimer () {
      this.timerId = setInterval(() => {
          if (this.timer === 1) {
            this.$pageManager.showAuth()
          }

          this.timer = this.timer - 1
      }, 1000)
    }
  },
  beforeDestroy () {
    clearInterval(this.timerId)
  }
}
