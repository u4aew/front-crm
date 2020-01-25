import { VIEWS } from '@/views/names'

export default {
  name: VIEWS.profile.categories.index.name,
  data: () => ({
    items: null,
    headers: [
      {
        text: 'Название',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      {
        text: 'Управление',
        value: 'action',
        align: 'right',
        sortable: false
      }
    ]
  }),
  methods: {
    deleteItem (id) {
      this.$shop.categories.deleteCategory(id)
    }
  },
  async mounted () {
    try {
      this.items = await this.$shop.categories.getCategories()
    } catch (e) {
      throw new Error(e)
    }
  }
}
