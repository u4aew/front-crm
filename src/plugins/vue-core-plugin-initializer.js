import Vue from 'vue'
import router from '@/router/index'
import velocity from 'velocity-animate'
import PageManager from '@/stage/page-manager'
import ServiceHolder from '@/plugins/service/service-holder'
import VueBackClient from '@/plugins/service/transport/vue-back-client'
import Notifications from 'vue-notification'
import PortalVue from 'portal-vue'
import wysiwyg from 'vue-wysiwyg'
import Vuelidate from 'vuelidate'

const HTTP_ADDRESS = 'http://localhost:4000/'

class VueCorePluginInitializer {
  static init () {
    Vue.use(Notifications, { velocity })
    Vue.use(VueBackClient, HTTP_ADDRESS)
    Vue.use(PageManager, router)
    Vue.use(PortalVue)
    Vue.use(Vuelidate)
    Vue.use(wysiwyg, {})
    Vue.use(ServiceHolder, {
      http: Vue.prototype.$http,
      notify: Vue.prototype.$notify,
      pageManager: Vue.prototype.$pageManager
    })
  }
}

export default VueCorePluginInitializer
