'use strict'

import Helper from '@/core/utils/helper'

const serverRespondedInterceptor = (serverHeader = null) => response => {
  response.serverResponded = Helper.isDefined(serverHeader) ? Helper.getCaseInsensitiveAttr(response.headers, serverHeader, false) : true
  if (!response.serverResponded) {
    return Promise.reject(response)
  }
  return response
}

export default serverRespondedInterceptor
