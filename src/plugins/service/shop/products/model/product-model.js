import ItemBaseExtendedModel from '@/plugins/service/shop/base/model/item-base-extended-model'

import Helper from '@/core/utils/helper'

class ProductModel extends ItemBaseExtendedModel {
  constructor (data) {
    super(data)
    this.price = Helper.getValue(data.price)
  }

  getPrice () {
    return this.price
  }
}

export default ProductModel
