import ItemsBaseModel from '@/plugins/service/shop/base/model/items-base-model'
import ItemsBaseExtendedModel from '@/plugins/service/shop/base/model/item-base-extended-model'

class BrandsService {
  constructor (notify, pageManager, api) {
    this.$notify = notify
    this.$pageManager = pageManager
    this.$api = api
  }

  getBrands () {
    return new Promise((resolve, reject) => {
      this.$api.getBrands()
        .then(({ data }) => {
          resolve(new ItemsBaseModel(data))
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  getBrand (id) {
    return new Promise((resolve, reject) => {
      this.$api.getBrand(id)
        .then(({ data }) => {
          resolve(new ItemsBaseExtendedModel(data))
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  createBrand (data) {
    return new Promise((resolve, reject) => {
      this.$api.createBrand(data)
        .then(() => {
          resolve()
          this.$pageManager.showShopBrands()
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  updateBrand (data) {
    return new Promise((resolve, reject) => {
      this.$api.updateBrand(data)
        .then(() => {
          resolve()
          this.$pageManager.showShopBrands()
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  deleteBrand (id) {
    if (confirm('Удалить бренд ?')) {
      return new Promise((resolve, reject) => {
        this.$api.deleteBrand(id)
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

export default BrandsService
