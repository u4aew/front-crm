import ItemBaseExtendedModel from '@/plugins/service/shop/base/model/item-base-extended-model'
import CategoryModel from '@/plugins/service/shop/categories/model/category-model'
import Helper from '@/core/utils/helper'

class ProductModel extends ItemBaseExtendedModel {
  constructor (data) {
    super(data)
    this.price = Helper.getValue(data.price)
    this.category = new CategoryModel(data.category)
  }

  getPrice () {
    return this.price
  }

  getCategory () {
    return this.category
  }
}

export default ProductModel
