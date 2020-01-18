import Vue from 'vue'
import router from '@/router/index'
import velocity from 'velocity-animate'
import PageManager from '@/stage/page-manager'
import ServiceHolder from '@/plugins/service/service-holder'
import ServiceUser from '@/plugins/service/user/service-user'
import VueBackClient from '@/plugins/service/transport/vue-back-client'

import ProductsPluginInitializer from '@/app/products/plugins/products-plugin-initializer'

import Notifications from 'vue-notification'
import PortalVue from 'portal-vue'

const HTTP_ADDRESS = 'https://httpbin.org/'

class VueCorePluginInitializer {
  static init () {
    Vue.use(Notifications, { velocity })
    Vue.use(VueBackClient, HTTP_ADDRESS)
    Vue.use(PageManager, router)
    Vue.use(ServiceUser)
    Vue.use(PortalVue)
    Vue.use(ServiceHolder, {
      http: Vue.prototype.$http,
      notify: Vue.prototype.$notify,
      pageManager: Vue.prototype.$pageManager
    })

    ProductsPluginInitializer()
  }
}

export default VueCorePluginInitializer
