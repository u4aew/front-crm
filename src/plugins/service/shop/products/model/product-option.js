import ProductOptionAttribute from '@/plugins/service/shop/products/model/product-option-attribute'
import Helper from '@/core/utils/helper'

class ProductOption {
  constructor ({ id, title, price, available, priceOld, major, idXML, attributes }) {
    this.id = id
    this.title = title
    this.price = price
    this.priceOld = priceOld
    this.available = available
    this.major = major
    this.idXML = idXML
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
