import UserHelper from '@/core/utils/user-helper'
export default {
  install (Vue) {
    Vue.prototype.$user = {
      getToken () {
        return UserHelper.getToken()
      },
      getRole () {
        return UserHelper.getRole()
      }
    }
  }
}
