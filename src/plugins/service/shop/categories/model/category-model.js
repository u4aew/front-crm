import ItemBaseExtendedModel from '@/plugins/service/base/model/item-base-extended-model'

import Helper from '@/core/utils/helper'

class CategoryModel extends ItemBaseExtendedModel {
  constructor (data) {
    super(data)
    this.parentId = Helper.getValue(data.parentId)
    this.parent = Helper.getValue(data.parent)
  }

  getParentId () {
    return this.parentId
  }

  getParent () {
    return this.parent
  }
}

export default CategoryModel
