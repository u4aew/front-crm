import Helper from '@/core/utils/helper'
import ItemBaseModel from '@/plugins/service/shop/base/model/item-base-model'

class ItemsBaseModel {
  constructor (items) {
    if (!Helper.isDefined(items)) {
      throw new Error('Items is undefined')
    }
    this.items = []

    items.forEach((item) => {
      try {
        this.items.push(new ItemBaseModel(item))
      } catch (e) {
        throw new Error(`Error parse item: [e = '${e.message()}']`)
      }
    })
  }

  getItems () {
    return this.items
  }
}

export default ItemsBaseModel
