'use strict'

import Vue from 'vue'
import ProductsServiceHolder from '@/app/products/plugins/service/products-service-holder'

const init = () => {
  return new Promise((resolve, reject) => {
    Vue.use(
      ProductsServiceHolder,
      Vue.prototype.$pageManager
    )
    resolve()
  })
}

export default init
