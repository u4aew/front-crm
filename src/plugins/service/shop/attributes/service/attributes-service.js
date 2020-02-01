import ItemsBaseModel from '@/plugins/service/shop/base/model/items-base-model'
import AttributeModel from '@/plugins/service/shop/attributes/model/attribute-model'

class AttributesService {
  constructor (notify, pageManager, api) {
    this.$notify = notify
    this.$pageManager = pageManager
    this.$api = api
  }

  getAttributes () {
    return new Promise((resolve, reject) => {
      this.$api.getAttributes()
        .then(({ data }) => {
          resolve(new ItemsBaseModel(data))
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  getAttribute (id) {
    return new Promise((resolve, reject) => {
      this.$api.getAttribute(id)
        .then(({ data }) => {
          resolve(new AttributeModel(data))
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  createAttribute (data) {
    return new Promise((resolve, reject) => {
      this.$api.createAttribute(data)
        .then(() => {
          resolve()
          this.$pageManager.showAttributes()
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  updateAttribute (data) {
    return new Promise((resolve, reject) => {
      this.$api.updateAttribute(data)
        .then(() => {
          resolve()
          this.$pageManager.showAttributes()
          this._processSuccess()
        })
        .catch((e) => {
          reject(e)
          this._catchError(e)
        })
    })
  }

  deleteAttribute (id) {
    if (confirm('Удалить атрибут ?')) {
      return new Promise((resolve, reject) => {
        this.$api.deleteAttribute(id)
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

export default AttributesService
