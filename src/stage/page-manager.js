'use strict'
import { VIEWS } from '@/views/names'

export default {
  install (Vue, router) {
    Vue.prototype.$pageManager = {
      showShopCategories () {
        toPage(VIEWS.profile.categories.index.name)
      }
    }

    function toPage (name, params = {}) {
      router.push({ name: name, params: params })
    }
  }
}
