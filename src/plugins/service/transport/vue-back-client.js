'use strict'

import HttpClient from '@/core/transport/http/http-client'

export default {
  install (Vue, httpUrl, opts = {}) {
    let httpClient = new HttpClient(httpUrl)
    Vue.prototype.$http = httpClient.instance
  }
}
