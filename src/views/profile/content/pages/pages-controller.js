export default {
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
        text: 'Родитель',
        align: 'right',
        sortable: true,
        value: 'parent'
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
        .then(() => {
          this.items = this.items.filter(item => item.getId() !== id)
        })
    }
  },
  async mounted () {
    try {
      const pages = await this.$content.pages.getPages()
      this.items = pages.getItems()
    } catch (e) {
      throw new Error(e)
    }
  }
}
