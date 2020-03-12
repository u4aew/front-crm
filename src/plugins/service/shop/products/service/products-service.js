import ItemsBaseModel from '@/plugins/service/base/model/items-base-model'
import ProductModel from '@/plugins/service/shop/products/model/product-model'
import ProductOption from '@/plugins/service/shop/products/model/product-option'

class ProductsService {
  constructor (notify, pageManager, api) {
    this.$notify = notify
    this.$pageManager = pageManager
    this.$api = api
  }

  getProducts () {
    return new Promise((resolve, reject) => {
      this.$api.getProducts()
        .then(({ data }) => {
          resolve(new ItemsBaseModel(data))
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  getProduct (id) {
    return new Promise((resolve, reject) => {
      this.$api.getProduct(id)
        .then(({ data }) => {
          resolve(new ProductModel(data))
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  createProduct (data) {
    return new Promise((resolve, reject) => {
      this.$api.createProduct(data)
        .then(() => {
          resolve()
          this.$pageManager.showProducts()
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  createProductOption (form) {
    return new Promise((resolve, reject) => {
      this.$api.createProductOption(form)
        .then(({ data }) => {
          resolve(new ProductOption(data))
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  updateProductOption (form) {
    return new Promise((resolve, reject) => {
      this.$api.updateProductOption(form)
        .then(({ data }) => {
          this._processSuccess()
          resolve()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  deleteProductOption (form) {
    return new Promise((resolve, reject) => {
      this.$api.deleteProductOption(form)
        .then(({ data }) => {
          this._processSuccess()
          resolve()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  updateProduct (data) {
    return new Promise((resolve, reject) => {
      this.$api.updateProduct(data)
        .then(() => {
          resolve()
          this.$pageManager.showProducts()
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  deleteProduct (id) {
    if (confirm('Удалить продукт ?')) {
      return new Promise((resolve, reject) => {
        this.$api.deleteProduct(id)
          .then(() => {
            resolve()
            this._processSuccess()
          })
          .catch((e) => {
            reject(e)
            this._catchError(e)
          })
      })
    }
  }

  _processSuccess () {
    // todo нотификация нужно добавить
    alert('Операция завершилась успешно')
  }

  _catchError (e) {
    // todo нотификация нужно добавить
    alert('Операция завершилась ошибкой')
  }
}

export default ProductsService
