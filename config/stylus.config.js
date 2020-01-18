const path = require('path')
const nib = require('nib')
const { utils } = require('stylus')
const { SvgLoader } = require('./utils/svg')
const { StylusHelper } = require('./utils/stylus')

const SVG_PATH = path.join(__dirname, '../src/assets/svg')
const svgItems = SvgLoader.load(SVG_PATH)

function stylusConnect (stylus) {
  stylus
    .define('str-replace', StylusHelper.strReplace)
    .define('$env', StylusHelper.env)
    .define('$svg', utils.coerceObject(svgItems, true))
}

module.exports = {
  use: [
    nib(),
    stylusConnect
  ],
  import: [
    '~nib/lib/nib/index.styl'
  ]
}
