import Helper from '@/core/utils/helper'

class CategoriesModel {
  constructor (categories) {
    if (Helper.isDefined(categories)) {
      throw new Error('Categories is undefined')
    }
    this.categories = []

    categories.forEach(() => {

    })
  }
}

export default CategoriesModel
