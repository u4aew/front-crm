import Helper from '@/core/utils/helper'

class CategoryModel {
  constructor ({ id, name }) {
    if (!Helper.isDefined(id)) {
      throw new Error('id is undefined')
    }
    if (!Helper.isDefined(name)) {
      throw new Error('name is undefined')
    }

    this.id = id
    this.name = name
  }

  getId () {
    return this.id
  }

  getName () {
    return this.name
  }
}

export default CategoryModel
