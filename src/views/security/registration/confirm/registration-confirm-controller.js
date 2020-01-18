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
      statusSuccess: false,
      statusError: false,
      timeoutId: null
    }
  },
  methods: {
    async registrationConfirm () {
      this.$setLoading()
      clearTimeout(this.timeoutId)
      try {
        await this.$service.security.registrationConfirm({ id: this.id })
        this.statusSuccess = true
      } catch (e) {
        console.log(e)
        this.statusError = true
      }
      this.$unsetLoading()
    }
  },
  mounted () {
    this.registrationConfirm()
  }
}
