class ProductOptionAttribute {
  constructor ({ id, value, attributeId }) {
    this.id = id
    this.value = value
    this.attributeId = attributeId
  }

  getId () {
    return this.id
  }

  getValue () {
    return this.value
  }

  getAttributeId () {
    return this.attributeId
  }
}

export default ProductOptionAttribute
