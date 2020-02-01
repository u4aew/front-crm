import ItemBaseModel from '@/plugins/service/shop/base/model/item-base-model'

import Helper from '@/core/utils/helper'

class AttributeModel extends ItemBaseModel {
  constructor (data) {
    super(data)
    this.unit = Helper.getValue(data.unit)
    this.type = Helper.getValue(data.type)
    this.isFilter = Helper.getValue(data.isFilter)
    this.required = Helper.getValue(data.required)
    this.optionRaw = Helper.getValue(data.optionRaw)
  }

  getUnit () {
    return this.unit
  }

  getType () {
    return this.type
  }

  getIsFilter () {
    return this.isFilter
  }

  getRequired () {
    return this.required
  }

  getOptionRaw () {
    return this.optionRaw
  }
}

export default AttributeModel
