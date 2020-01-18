'use strict'
import { VIEWS } from '@/views/names'

export default {
  install (Vue, router) {
    Vue.prototype.$pageManager = {
      showMarket () {
        toPage(VIEWS.profile.products.market.index.name)
      },
      showAuth () {
        toPage(VIEWS.security.auth.name)
      },
      showRegistration () {
        toPage(VIEWS.security.registration.name)
      },
      showRegistrationConfirm () {
        toPage(VIEWS.security.registrationConfirm.name)
      },
      showRecovery () {
        toPage(VIEWS.security.recovery.name)
      },
      showRecoveryConfirm () {
        toPage(VIEWS.security.recoveryConfirm.name)
      }
    }

    function toPage (name, params = {}) {
      router.push({ name: name, params: params })
    }
  }
}
