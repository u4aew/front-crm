import ItemBaseExtendedModel from '@/plugins/service/shop/base/model/item-base-extended-model'

import Helper from '@/core/utils/helper'

class CategoryModel extends ItemBaseExtendedModel {
  constructor (data) {
    super(data)
    this.parentId = Helper.getValue(data.parentId)
  }

  getParentId () {
    return this.parentId
  }
}

export default CategoryModel
