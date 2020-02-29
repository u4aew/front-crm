import ItemBaseModel from '@/plugins/service/shop/base/model/item-base-model'
import ItemBaseExtendedModel from '@/plugins/service/shop/base/model/item-base-extended-model'
import CategoryModel from '@/plugins/service/shop/categories/model/category-model'
import ProductOption from '@/plugins/service/shop/products/model/product-option'
import Helper from '@/core/utils/helper'

class ProductModel extends ItemBaseExtendedModel {
  constructor (data) {
    super(data)
    this.category = new CategoryModel(data.category)
    this.brand = new ItemBaseModel(data.brand)
    this.type = new ItemBaseModel(data.type)
    this.productOptions = []

    if (Helper.isDefined(data.productOptions) && Helper.isNotEmpty(data.productOptions)) {
      data.productOptions.forEach((item) => {
        this.productOptions.push(new ProductOption(item))
      })
    }
  }

  getProductOptions () {
    return this.productOptions
  }

  getType () {
    return this.type
  }

  getPrice () {
    return this.price
  }

  getCategory () {
    return this.category
  }

  getBrand () {
    return this.brand
  }
}

export default ProductModel
