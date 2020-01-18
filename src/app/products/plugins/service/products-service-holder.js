'use strict'

import ProductsService from '@/app/products/service/products-service'
import ProductsApi from '@/app/products/service/products-api'

export default {
  install (Vue, pageManager) {
    let api = new ProductsApi(Vue.prototype.$http)
    Vue.prototype.$products = {
      service: new ProductsService(pageManager, api)
    }
  }
}
