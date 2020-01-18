'use strict'

import AbstractHandler from '@/app/back/socket/handler/abstact-handler'
import { eventBus } from '@/app/event-bus'
import LoggerId from '@/app/logger/logger-id-adapter'

const log = LoggerId.API

/**
 * Обработчик запросов api
 */
class ApiHandler extends AbstractHandler {
  process (method, requestId, data) {
    switch (method) {
      case 'phone/code/send':
        onSmsRequestResult(requestId, data)
        break
      case 'phone/code/validate':
        onSmsVerifyResult(requestId, data)
        break
      default:
        super.onWrongRequest(method)
    }
  }

  getType () {
    return 'api'
  }
}

function onSmsRequestResult (requestId, data) {
  log.info(`    Sms request event: [id = '${requestId}', result = '${JSON.stringify(data)}']`)
  eventBus.emitSmsRequestResult(requestId, data)
}

function onSmsVerifyResult (requestId, data) {
  log.info(`    Sms verify event: [id = '${requestId}', result = '${JSON.stringify(data)}']`)
  eventBus.emitSmsVerifyResult(requestId, data)
}

export default ApiHandler
