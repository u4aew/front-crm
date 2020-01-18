const path = {
  auth: '/post',
  reg: '/post',
  regConfirm: '/post',
  role: '/post',
  recovery: '/post',
  recoveryPassword: '/post'
}

class ServiceBaseSecurity {
  constructor (http) {
    this.$http = http
  }

  _setUserData () {
    let token = 'g465df4fh6546k84kd4hjf654j6fgj1f65hj'
    let role = 'admin'
    window.localStorage.setItem('userToken', token)
    window.localStorage.setItem('userRole', role)
  }

  _requestRoleUser (token) {
    return this.$http.post(path.role, {
      token: 'sdf54s64d654dsf64dsf65sd4fsdfsd4f6fsd'
    })
  }

  _requestAuth (login, password) {
    return this.$http.post(path.auth, {
      login,
      password
    })
  }

  _requestRegistration (login, password, email) {
    return this.$http.post(path.reg, {
      login,
      password,
      email
    })
  }

  _requestRegistrationConfirm (id) {
    return this.$http.post(path.regConfirm, { id })
  }

  _requestRecovery (login) {
    return this.$http.post(path.recovery, { login })
  }
  _requestRecoveryPassword (password, passwordConfirm, id) {
    return this.$http.post(path.recoveryPassword, { password, passwordConfirm, id })
  }
}

export default ServiceBaseSecurity
