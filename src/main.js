import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import VueCorePluginInitializer from './plugins/vue-core-plugin-initializer'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

VueCorePluginInitializer.init()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('[js-app]')
