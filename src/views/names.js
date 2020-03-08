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
      index: createView('productsIndex'),
      edit: createView('productsEdit'),
      create: createView('productsCreate')
    },
    categories: {
      index: createView('categoriesIndex'),
      edit: createView('categoriesEdit'),
      create: createView('categoriesCreate')
    },
    attributes: {
      index: createView('attributesIndex'),
      edit: createView('attributesEdit'),
      create: createView('attributesCreate')
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
    },
    pages: {
      index: createView('Pages'),
      edit: createView('PagesEdit'),
      create: createView('PagesCreate')
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
