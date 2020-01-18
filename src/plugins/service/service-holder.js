'use strict'

import ServiceApi from '@/plugins/service/service-api'
import ServiceSecurity from '@/plugins/service/security/service-security'

export default {
  install (Vue, opts = {}) {
    let http = opts.http
    let notify = opts.notify
    let pageManager = opts.pageManager
    Vue.prototype.$service = {
      api: new ServiceApi(http),
      security: new ServiceSecurity(http, notify, pageManager)
    }
  }
}
