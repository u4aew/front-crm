import Vue from 'vue'
import Router from 'vue-router'
import { VIEWS } from '@/views/names'
import NProgress from 'nprogress'
// security

// Profile
import Profile from '@/views/profile/Profile'

// Shop
import Categories from '@/views/profile/shop/categories/Categories'
import Products from '@/views/profile/shop/products/Products'
import Brands from '@/views/profile/shop/brands/Brands'

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
          path: 'products',
          component: Products,
          name: VIEWS.profile.products.index.name
        },
        {
          path: 'categories',
          component: Categories,
          name: VIEWS.profile.categories.index.name
        },
        {
          path: 'Brands',
          component: Brands,
          name: VIEWS.profile.brands.index.name
        }
      ]
    },
    {
      path: '*',
      name: VIEWS.error.notFound,
      component: NotFound
    }
  ],
  mode: 'history'
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
