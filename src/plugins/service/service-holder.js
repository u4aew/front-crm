'use strict'

import CategoriesService from '@/plugins/service/shop/categories/service/categories-service'
import CategoriesApiService from '@/plugins/service/shop/categories/service/categories-api-service'

import BrandsService from '@/plugins/service/shop/brands/service/brands-service'
import BrandsApiService from '@/plugins/service/shop/brands/service/brands-api-service'

import TypeProductsService from '@/plugins/service/shop/type-products/service/type-products-service'
import TypeProductsApiService from '@/plugins/service/shop/type-products/service/type-products-api-service'

import AttributesService from '@/plugins/service/shop/attributes/service/attributes-service'
import AttributesApiService from '@/plugins/service/shop/attributes/service/attributes-api-service'

export default {
  install (Vue, opts = {}) {
    const http = opts.http
    const notify = opts.notify
    const pageManager = opts.pageManager

    const apiCategories = new CategoriesApiService(http)
    const apiBrands = new BrandsApiService(http)
    const apiTypeProducts = new TypeProductsApiService(http)
    const apiAttributes = new AttributesApiService(http)
    Vue.prototype.$shop = {
      categories: new CategoriesService(notify, pageManager, apiCategories),
      brands: new BrandsService(notify, pageManager, apiBrands),
      typeProducts: new TypeProductsService(notify, pageManager, apiTypeProducts),
      attributes: new AttributesService(notify, pageManager, apiAttributes)
    }
  }
}
