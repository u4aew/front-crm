import { VIEWS } from '@/views/names'

export default {
  name: VIEWS.profile.categories.index.name,
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
      this.$shop.brands.deleteBrand(id)
        .then(() => {
          this.items = this.items.filter(item => item.getId() !== id)
        })
    }
  },
  async mounted () {
    try {
      const brands = await this.$shop.brands.getBrands()
      this.items = brands.getItems()
    } catch (e) {
      throw new Error(e)
    }
  }
}
