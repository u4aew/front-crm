'use strict'

import LoggerId from '@/app/logger/logger-id-adapter'
import Notifier from '@/plugins/notifier/notifier'
import String from '@/utils/string'
import Helper from '@/utils/helper'

const log = LoggerId.SOCKET

class HandlerDispatcher {
  constructor () {
    this.handlers = new Map()
  }

  addHandler (handler) {
    let type = handler.getType()
    if (typeof type === 'undefined' || type.length === 0) {
      throw new Error('Handler type null or empty')
    }
    this.handlers.set(type, handler)
  }

  process (event) {
    log.info('Get message: \'%s\'', event.data)

    let req = JSON.parse(event.data)
    let handler = this.handlers.get(req.module)

    if (handler) {
      handler.process(req.method, Helper.getValue(req.requestId), req.data)
    } else {
      log.error(String.format('Unknown module: {0}', req.module))
      Notifier.notifyError(String.format('Invalid socket request: [module = {0}]', req.module))
    }
  }
}

export default new HandlerDispatcher()
