import ItemsBaseModel from '@/plugins/service/shop/base/model/items-base-model'
import CategoryModel from '@/plugins/service/shop/categories/model/category-model'

class CategoriesService {
  constructor (notify, pageManager, api) {
    this.$notify = notify
    this.$pageManager = pageManager
    this.$api = api
  }

  getCategories () {
    return new Promise((resolve, reject) => {
      this.$api.getCategories()
        .then(({ data }) => {
          resolve(new ItemsBaseModel(data))
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  getCategory (id) {
    return new Promise((resolve, reject) => {
      this.$api.getCategory(id)
        .then(({ data }) => {
          resolve(new CategoryModel(data))
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  createCategory (data) {
    return new Promise((resolve, reject) => {
      this.$api.createCategory(data)
        .then(() => {
          resolve()
          this.$pageManager.showShopCategories()
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  updateCategory (data) {
    return new Promise((resolve, reject) => {
      this.$api.updateCategory(data)
        .then(() => {
          resolve()
          this.$pageManager.showShopCategories()
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  deleteCategory (id) {
    if (confirm('Удалить категорию ?')) {
      return new Promise((resolve, reject) => {
        this.$api.deleteCategory(id)
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

export default CategoriesService
