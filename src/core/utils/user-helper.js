import Helper from '@/core/utils/helper'
const propsToken = 'userToken'
const propsRole = 'userRole'

class UserHelper {
  static getToken () {
    return window.localStorage.getItem(propsToken)
  }

  static getRole () {
    return window.localStorage.getItem(propsRole)
  }

  static isAuth () {
    return Helper.isDefined(this.getToken())
  }
}

export default UserHelper
