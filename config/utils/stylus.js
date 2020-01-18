class StylusHelper {
  static unquote (_str) {
    return _str.toString().replace(/^['"]|['"]$/g, '')
  }

  static strReplace (_string, _match, _value) {
    const string = StylusHelper.unquote(_string)
    const match = StylusHelper.unquote(_match)
    const value = StylusHelper.unquote(_value)

    return string.replace(new RegExp(match, 'gm'), value)
  }

  static get env () {
    return StylusHelper.unquote(process.env.NODE_ENV)
  }
}

module.exports = {
  StylusHelper
}
