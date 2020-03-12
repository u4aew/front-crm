import ItemsBaseModel from '@/plugins/service/shop/base/model/items-base-model'
import ItemsBaseExtendedModel from '@/plugins/service/shop/base/model/item-base-extended-model'

class PagesService {
  constructor (notify, pageManager, api) {
    this.$notify = notify
    this.$pageManager = pageManager
    this.$api = api
  }

  getPages () {
    return new Promise((resolve, reject) => {
      this.$api.getPages()
        .then(({ data }) => {
          resolve(new ItemsBaseModel(data))
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  getPage (id) {
    return new Promise((resolve, reject) => {
      this.$api.getPage(id)
        .then(({ data }) => {
          resolve(new ItemsBaseExtendedModel(data))
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  createPage (data) {
    return new Promise((resolve, reject) => {
      this.$api.createPage(data)
        .then(() => {
          resolve()
          // this.$pageManager.showShopBrands()
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  updatePage (data) {
    return new Promise((resolve, reject) => {
      this.$api.updatePage(data)
        .then(() => {
          resolve()
          // this.$pageManager.showShopBrands()
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  deletePage (id) {
    if (confirm('Удалить страницу ?')) {
      return new Promise((resolve, reject) => {
        this.$api.deletePage(id)
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

export default PagesService
