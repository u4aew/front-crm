'use strict'

/**
 * Хранилище всех имен view, доступных для роутинга
 */

export const VIEWS = {
  security: {
    auth: createView('auth'),
    registration: createView('registration'),
    registrationConfirm: createView('registrationConfirm'),
    recovery: createView('recovery'),
    recoveryConfirm: createView('recoveryConfirm')
  },
  profile: {
    index: createView('profile'),
    products: {
      index: createView('products')
    },
    categories: {
      index: createView('categoriesIndex'),
      edit: createView('categoriesEdit'),
      create: createView('categoriesCreate')
    },
    brands: {
      index: createView('brands'),
      edit: createView('brandsEdit'),
      create: createView('brandsCreate')
    },
    typeProducts: {
      index: createView('typeProducts'),
      edit: createView('typeProductsEdit'),
      create: createView('typeProductsCreate')
    }
  },
  about: createView('about'),
  home: createView('home'),
  error: {
    notFound: createView('ErrorNotFound')
  }
}

function createView (name) {
  return {
    name: name
  }
}
