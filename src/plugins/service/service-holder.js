'use strict'

import CategoriesService from '@/plugins/service/shop/categories/service/categories-service'
import CategoriesApiService from '@/plugins/service/shop/categories/service/categories-api-service'

export default {
  install (Vue, opts = {}) {
    let http = opts.http
    let notify = opts.notify
    let pageManager = opts.pageManager
    let api = new CategoriesApiService(http)
    Vue.prototype.$shop = {
      categories: new CategoriesService(notify, pageManager, api)
    }
  }
}
