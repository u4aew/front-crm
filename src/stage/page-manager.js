'use strict'
import { VIEWS } from '@/views/names'

export default {
  install (Vue, router) {
    Vue.prototype.$pageManager = {
      showShopCategories () {
        toPage(VIEWS.profile.categories.index.name)
      },
      showShopBrands () {
        toPage(VIEWS.profile.brands.index.name)
      },
      showTypeProducts () {
        toPage(VIEWS.profile.typeProducts.index.name)
      },
      showProducts () {
        toPage(VIEWS.profile.products.index.name)
      },
      showAttributes () {
        toPage(VIEWS.profile.attributes.index.name)
      }
    }

    function toPage (name, params = {}) {
      router.push({ name: name, params: params })
    }
  }
}
