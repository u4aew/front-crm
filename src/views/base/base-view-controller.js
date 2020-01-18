/** Базовый конттроллер
 * @loading состояние для отображние загрузки
 */

export default {
  name: 'BaseView',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    $setLoading () {
      this.loading = true
    },
    $unsetLoading () {
      this.loading = false
    }
  }
}
