import Helper from '@/core/utils/helper'

class HelperCategories {
  static normalize (data) {
    return parse(data)
  }
}

const parse = (data) => {
  const result = []
  const parseItem = (item, parent = null, parentId = null) => {
    const { id, name, children } = item
    result.push({ id, name, parent, parentId })
    if (Helper.isNotEmpty(children)) {
      children.forEach((item) => {
        parseItem(item, name, id)
      })
    }
  }
  data.forEach((item) => {
    parseItem(item)
  })
  return result
}

export default HelperCategories
