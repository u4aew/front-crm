import { VIEWS } from '@/views/names'

export default {
  name: VIEWS.profile.typeProducts.index.name,
  data: () => ({
    items: [],
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
      this.$shop.typeProducts.deleteTypeProduct(id)
        .then(() => {
          this.items = this.items.filter(item => item.getId() !== id)
        })
    }
  },
  async mounted () {
    try {
      const typeProducts = await this.$shop.typeProducts.getTypeProducts()
      this.items = typeProducts.getItems()
    } catch (e) {
      throw new Error(e)
    }
  }
}
