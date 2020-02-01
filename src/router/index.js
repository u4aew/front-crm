import Vue from 'vue'
import Router from 'vue-router'
import { VIEWS } from '@/views/names'
import NProgress from 'nprogress'
// security

// Profile
import Profile from '@/views/profile/Profile'

// Shop
import Categories from '@/views/profile/shop/categories/Categories'
import CategoriesItem from '@/views/profile/shop/categories/item/CategoriesItem'

import Brands from '@/views/profile/shop/brands/Brands'
import BrandsItem from '@/views/profile/shop/brands/item/BrandsItem'

import Products from '@/views/profile/shop/products/Products'
import ProductsItem from '@/views/profile/shop/products/item/ProductsItem'

import TypeProducts from '@/views/profile/shop/type-products/TypeProducts'
import TypeProductsItem from '@/views/profile/shop/type-products/item/TypeProductsItem'

import Attributes from '@/views/profile/shop/attributes/Attributes'
import AttributesItem from '@/views/profile/shop/attributes/item/AttributesItem'
// system
import NotFound from '@/views/errors/not-found'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: VIEWS.profile.index.name,
      component: Profile,
      children: [
        {
          path: 'categories',
          component: Categories,
          name: VIEWS.profile.categories.index.name
        },
        {
          path: 'categories/create/',
          component: CategoriesItem,
          name: VIEWS.profile.categories.create.name
        },
        {
          path: 'categories/:id',
          component: CategoriesItem,
          name: VIEWS.profile.categories.edit.name,
          props: { edit: true }
        },
        {
          path: 'products',
          component: Products,
          name: VIEWS.profile.products.index.name
        },
        {
          path: 'products/create/',
          component: ProductsItem,
          name: VIEWS.profile.products.create.name
        },
        {
          path: 'products/:id',
          component: ProductsItem,
          name: VIEWS.profile.products.edit.name,
          props: { edit: true }
        },
        {
          path: 'brands',
          component: Brands,
          name: VIEWS.profile.brands.index.name
        },
        {
          path: 'brands/create/',
          component: BrandsItem,
          name: VIEWS.profile.brands.create.name
        },
        {
          path: 'brands/:id',
          component: BrandsItem,
          name: VIEWS.profile.brands.edit.name,
          props: { edit: true }
        },
        {
          path: 'type-products',
          component: TypeProducts,
          name: VIEWS.profile.typeProducts.index.name
        },
        {
          path: 'type-products/create/',
          component: TypeProductsItem,
          name: VIEWS.profile.typeProducts.create.name
        },
        {
          path: 'type-products/:id',
          component: TypeProductsItem,
          name: VIEWS.profile.typeProducts.edit.name,
          props: { edit: true }
        },
        {
          path: 'attributes',
          component: Attributes,
          name: VIEWS.profile.attributes.index.name
        },
        {
          path: 'attributes/create/',
          component: AttributesItem,
          name: VIEWS.profile.attributes.create.name
        },
        {
          path: 'attributes/:id',
          component: AttributesItem,
          name: VIEWS.profile.attributes.edit.name,
          props: { edit: true }
        }
      ]
    },
    {
      path: '*',
      name: VIEWS.error.notFound,
      component: NotFound
    }
  ]
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
