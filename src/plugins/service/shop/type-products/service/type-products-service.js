import ItemsBaseModel from '@/plugins/service/shop/base/model/items-base-model'
import ItemBaseModel from '@/plugins/service/shop/base/model/item-base-model'

class TypeProductsService {
  constructor (notify, pageManager, api) {
    this.$notify = notify
    this.$pageManager = pageManager
    this.$api = api
  }

  getTypeProducts () {
    return new Promise((resolve, reject) => {
      this.$api.getTypeProducts()
        .then(({ data }) => {
          resolve(new ItemsBaseModel(data))
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  getTypeProduct (id) {
    return new Promise((resolve, reject) => {
      this.$api.getTypeProduct(id)
        .then(({ data }) => {
          resolve(new ItemBaseModel(data))
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  createTypeProduct (data) {
    return new Promise((resolve, reject) => {
      this.$api.createTypeProduct(data)
        .then(() => {
          resolve()
          this.$pageManager.showTypeProducts()
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  updateTypeProduct (data) {
    return new Promise((resolve, reject) => {
      this.$api.updateTypeProduct(data)
        .then(() => {
          resolve()
          this.$pageManager.showTypeProducts()
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  deleteTypeProduct (id) {
    if (confirm('Удалить тип товара ?')) {
      return new Promise((resolve, reject) => {
        this.$api.deleteTypeProduct(id)
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

export default TypeProductsService
