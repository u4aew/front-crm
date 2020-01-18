import ServiceBaseSecurity from './service-base-security'

const errors = {
  auth: { group: 'system', type: 'error', text: 'Неверный пароль, попробуйте еще раз' },
  reg: { group: 'system', type: 'error', text: 'Ошибка регистрации' },
  system: { group: 'system', type: 'error', text: 'Системная ошибка' }
}

class SecurityService extends ServiceBaseSecurity {
  constructor (http, notify) {
    super(http)
    this.$notify = notify
  }

  async auth ({ login, password }) {
    let userToken = {}
    let userRole = {}
    try {
      userToken = await this._requestAuth(login, password)
      this._setUserData(userToken)
      userRole = await this._requestRoleUser(userToken)
      this._setUserData(userRole, userRole)
    } catch (e) {
      this.$notify(errors.auth)
      throw new Error(e)
    }
  }

  async registration ({ login, password, email }) {
    try {
      await this._requestRegistration(login, password, email)
    } catch (e) {
      this.$notify(errors.reg)
      throw new Error(e)
    }
  }

  async registrationConfirm ({ id }) {
    try {
      await this._requestRegistrationConfirm(id)
    } catch (e) {
      this.$notify(errors.reg)
      throw new Error(e)
    }
  }

  async recovery ({ login }) {
    try {
      await this._requestRecovery(login)
    } catch (e) {
      this.$notify(errors.reg)
      throw new Error(e)
    }
  }

  async recoveryPassword ({ password, passwordConfirm, id }) {
    try {
      await this._requestRecoveryPassword(password, passwordConfirm, id)
    } catch (e) {
      this.$notify(errors.reg)
      throw new Error(e)
    }
  }
}

export default SecurityService
