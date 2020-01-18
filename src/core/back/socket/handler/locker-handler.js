'use strict'

import AbstractHandler from '@/app/back/socket/handler/abstact-handler'
import LoggerId from '@/app/logger/logger-id-adapter'
import { eventBus } from '@/app/event-bus'

const log = LoggerId.HARDWARE

/**
 * Обработчик запросов локера (постаматы) от демона
 */
class LockerHandler extends AbstractHandler {
  process (method, requestId, data) {
    switch (method) {
      case 'event':
        onEvent(data)
        break
      default:
        super.onWrongRequest(method)
    }
  }

  getType () {
    return 'locker'
  }
}

function onEvent (data) {
  log.info('Locker event: \'%s\'', JSON.stringify(data))
  eventBus.emitLocker(data)
}

export default LockerHandler
