import ProductOptionAttribute from '@/plugins/service/shop/products/model/product-option-attribute'
import Helper from '@/core/utils/helper'

class ProductOption {
  constructor ({ id, title, price, available, attributes }) {
    this.id = id
    this.title = title
    this.price = price
    this.available = available
    this.attributes = []

    if (Helper.isDefined(attributes) && Helper.isNotEmpty(attributes)) {
      attributes.forEach((attribute) => {
        try {
          this.attributes.push(new ProductOptionAttribute(attribute))
        } catch (e) {
          throw new Error(`Error parse attribute: [e = '${e.message()}']`)
        }
      })
    }
  }
}

export default ProductOption
