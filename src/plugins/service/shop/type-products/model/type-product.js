import ItemBaseModel from '@/plugins/service/base/model/item-base-model'
import AttributeModel from '@/plugins/service/shop/attributes/model/attribute-model'
import Helper from '@/core/utils/helper'

class TypeProduct extends ItemBaseModel {
  constructor (data) {
    super(data)
    this.attributes = []

    if (Helper.isDefined(data.attributes) && Helper.isNotEmpty(data.attributes)) {
      data.attributes.forEach((item) => {
        try {
          this.attributes.push(new AttributeModel(item))
        } catch (e) {
          // do nothing
        }
      })
    }
  }

  getAttributes () {
    return this.attributes
  }
}

export default TypeProduct
