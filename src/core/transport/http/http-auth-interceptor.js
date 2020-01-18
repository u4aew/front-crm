'use strict'

import Helper from '@/core/utils/helper'
import HttpHeaders from './http-headers'

export const authInterceptor = (auth) => request => {
  if (Helper.isDefined(auth)) {
    if (Helper.isDefined(auth.apiKey)) {
      request.headers[HttpHeaders.xApiKey] = auth.apiKey
    }
    if (Helper.isDefined(auth.login) || Helper.isDefined(auth.password)) {
      request.auth = {
        username: Helper.getValue(auth.login),
        password: Helper.getValue(auth.password)
      }
    }
  }

  return request
}
