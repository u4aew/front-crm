import Helper from '@/core/utils/helper'
import CategoryModel from '@/plugins/service/shop/categories/model/category-model'

class CategoriesModel {
  constructor (items) {
    if (!Helper.isDefined(items)) {
      throw new Error('Items is undefined')
    }
    this.items = []

    items.forEach((item) => {
      try {
        this.items.push(new CategoryModel(item))
      } catch (e) {
        throw new Error(`Error parse item: [e = '${e.message()}']`)
      }
    })
  }

  getItems () {
    return this.items
  }
}

export default CategoriesModel
