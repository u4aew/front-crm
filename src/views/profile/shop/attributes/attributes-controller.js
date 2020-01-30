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
        text: 'Управление',
        value: 'action',
        align: 'right',
        sortable: false
      }
    ]
  }),
  methods: {
    deleteItem (id) {
      this.$shop.attributes.deleteAttribute(id)
        .then(() => {
          this.items = this.items.filter(item => item.getId() !== id)
        })
    }
  },
  async mounted () {
    try {
      const model = await this.$shop.attributes.getAttributes()
      this.items = model.getItems()
    } catch (e) {
      throw new Error(e)
    }
  }
}
