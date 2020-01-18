'use strict'

import Notifier from '@/plugins/notifier/notifier'
import String from '@/utils/string'
import LoggerId from '@/app/logger/logger-id-adapter'

const log = LoggerId.SOCKET

class AbstractHandler {
  onWrongRequest (method) {
    log.warn(String.format('Wrong request: {0}', method))
    Notifier.notifyWarn(String.format('Invalid socket request: [method = {0}]', method))
  }
}

export default AbstractHandler
