import Helper from '@/core/utils/helper'

class ItemBaseModel {
  constructor ({ id, name, slug, image, description, shortDescription, metaTitle, metaKeywords, metaDescription }) {
    if (!Helper.isDefined(id)) {
      throw new Error('id is undefined')
    }
    if (!Helper.isDefined(name)) {
      throw new Error('name is undefined')
    }

    this.id = id
    this.name = name
    this.slug = Helper.getValue(slug)
    this.image = Helper.getValue(image)
    this.description = Helper.getValue(description)
    this.shortDescription = Helper.getValue(shortDescription)
    this.metaTitle = Helper.getValue(metaTitle)
    this.metaKeywords = Helper.getValue(metaKeywords)
    this.metaDescription = Helper.getValue(metaDescription)
  }

  getId () {
    return this.id
  }

  getName () {
    return this.name
  }

  getSlug () {
    return this.slug
  }

  getImage () {
    return this.image
  }

  getDescription () {
    return this.description
  }
  getShortDescription () {
    return this.shortDescription
  }

  getMetaTitle () {
    return this.metaTitle
  }

  getMetaKeywords () {
    return this.metaKeywords
  }

  getMetaDescription () {
    return this.metaDescription
  }
}

export default ItemBaseModel
