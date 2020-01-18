import baseViewController from '@/views/base/base-view-controller'

export default {
  mixins: [baseViewController],
  data () {
    return {
      fieldsInfo: [
        {
          type: 'input',
          inputType: 'text',
          label: 'Имя',
          name: 'firstName',
          value: null,
          placeholder: 'Введите имя',
          required: true
        },
        {
          type: 'input',
          inputType: 'text',
          label: 'Фамилия',
          name: 'lastName',
          value: null,
          placeholder: 'Введите фамилию',
          required: true
        },
        {
          type: 'input',
          inputType: 'phone',
          label: 'Телефон',
          name: 'phone',
          value: null,
          placeholder: 'Введите телефон',
          required: true
        },
        {
          type: 'input',
          inputType: 'email',
          label: 'Почта (логин)',
          name: 'email',
          value: null,
          placeholder: 'Введите почту',
          required: true
        },
        {
          type: 'input',
          inputType: 'password',
          label: 'Пароль',
          name: 'password',
          value: null,
          placeholder: 'Введите пароль',
          required: true
        }
      ],
      fieldsCompany: [
        {
          type: 'input',
          inputType: 'text',
          label: 'Названии организации',
          name: 'company',
          value: null,
          placeholder: 'Введите название организации',
          delimiterBottom: true,
          required: true
        },
        {
          type: 'input',
          inputType: 'image',
          label: 'Загрузите автарку',
          name: 'avatar',
          value: null,
          required: true
        }
      ],
      visible2step: false,
      visibleSuccessInfo: false,
      fieldsFilled: null
    }
  },
  methods: {
    show2step ({ fields }) {
      this.fieldsFilled = fields
      this._setVisibleStep()
    },
    async registration ({ fields }) {
      this.$setLoading()
      this.fieldsFilled = { ...this.fieldsFilled, ...fields }

      console.log(this.fieldsFilled)
      try {
        this.$service.security.registration(this.fieldsFilled)
        this.visibleSuccessInfo = true
      } catch (e) {
        console.log(e)
      }
      this.$unsetLoading()
    },
    _setVisibleStep () {
      this.visible2step = true
    },
    _unsetVisibleStep () {
      this.visible2step = false
    }
  }
}
