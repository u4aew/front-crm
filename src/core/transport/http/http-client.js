'use strict'

import axios from 'axios'
import Helper from '@/core/utils/helper'
import delayInterceptor from './interceptor/http-delay-interceptor'
import { updateLastActionInterceptor } from './update-last-action-interceptor'
import { authInterceptor } from './http-auth-interceptor'
import serverRespondedInterceptor from '../../../core/transport/http/interceptor/http-server-responded-interceptor'
import responseInterceptor from '../../../core/transport/http/interceptor/http-response-intrceptor'

const ONE_SECOND = 1000
const defaultOpts = {
  timeout: 30,
  attemptCount: 1,
  attemptPause: 5
}

export default class {
  constructor (address, opts = {}) {
    this.address = address
    this.requestConfig = getRequestConfig(opts.requestConfig)
    this.authConfig = opts.auth
    this.instance = axios.create({
      baseURL: `${address}`,
      timeout: this.requestConfig.timeout
    })
  }

  addRequestInterceptor (interceptor) {
    this.instance.interceptors.request.use(interceptor)
  }

  addResponseInterceptor (responseInterceptor, errorInterceptor) {
    this.instance.interceptors.response.use(responseInterceptor, errorInterceptor)
  }

  _addDelayInterceptor (serverHeader) {
    const interceptor = delayInterceptor(this.instance, {
      retries: this.requestConfig.attemptCount,
      delay: this.requestConfig.attemptPause
    }, serverHeader)
    this.addResponseInterceptor(null, interceptor)
  }

  // todo: https://github.com/axios/axios/issues/1663
  addDefaultInterceptors (serverHeader = null) {
    this.addRequestInterceptor(updateLastActionInterceptor())
    this.addRequestInterceptor(authInterceptor(this.authConfig))
    this._addDelayInterceptor(serverHeader)
    this.addResponseInterceptor(serverRespondedInterceptor(serverHeader))
    this.addResponseInterceptor(responseInterceptor())
  }
}

function getRequestConfig (requestConfig) {
  let config = {}
  if (Helper.isDefined(requestConfig)) {
    config.timeout = (Helper.isDefined(requestConfig.timeout) ? requestConfig.timeout : defaultOpts.timeout) * ONE_SECOND
    config.attemptCount = Helper.isDefined(requestConfig.attemptCount) ? requestConfig.attemptCount : defaultOpts.attemptCount
    config.attemptPause = (Helper.isDefined(requestConfig.attemptPause) ? requestConfig.attemptPause : defaultOpts.attemptPause) * ONE_SECOND
  } else {
    config.timeout = defaultOpts.timeout * ONE_SECOND
    config.attemptCount = defaultOpts.attemptCount
    config.attemptPause = defaultOpts.attemptPause * ONE_SECOND
  }
  return config
}
