const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
const SVGO = require('svgo')

const svgoConfig = {
  plugins: [
    { cleanupAttrs: true },
    { removeDoctype: true },
    { removeXMLProcInst: true },
    { removeComments: true },
    { removeMetadata: true },
    { removeTitle: true },
    { removeDesc: true },
    { removeUselessDefs: true },
    { removeEditorsNSData: true },
    { removeEmptyAttrs: true },
    { removeHiddenElems: true },
    { removeEmptyText: true },
    { removeEmptyContainers: true },
    { removeViewBox: false },
    { cleanupEnableBackground: true },
    { convertStyleToAttrs: true },
    { convertColors: true },
    { convertPathData: true },
    { convertTransform: true },
    { removeUnknownsAndDefaults: true },
    { removeNonInheritableGroupAttrs: true },
    { removeUselessStrokeAndFill: true },
    { removeUnusedNS: true },
    { cleanupIDs: true },
    { cleanupNumericValues: true },
    { moveElemsAttrsToGroup: true },
    { moveGroupAttrsToElems: true },
    { collapseGroups: true },
    { removeRasterImages: false },
    { mergePaths: true },
    { convertShapeToPath: true },
    { sortAttrs: true }
  ]
}

class SvgNormalizer {
  constructor (file) {
    this._file = file
    this._info = {}
  }

  _notPreserveNormalize () {
    const $ = cheerio.load(this._file, {
      xmlMode: true
    })
    this._file = $('svg').attr('preserveAspectRatio', 'none').wrap('<div/>').parent().html().replace('&gt;', '>').toString()
  }

  _charNormalize () {
    this._file = this._file.replace(/[{}|\\^~[\]`"<>#%]/g, match => {
      return '%' + match[0].charCodeAt(0).toString(16).toUpperCase()
    }).trim()
  }

  async _svgoNormalize () {
    const { data, info } = await new SVGO(svgoConfig).optimize(this._file)
    this._file = data
    this._info = info
  }

  async init () {
    await this._svgoNormalize()
    this._notPreserveNormalize()
    this._charNormalize()

    return {
      width: parseInt(this._info.width),
      height: parseInt(this._info.height),
      icon: this._file
    }
  }

  static normalize (file) {
    return new SvgNormalizer(file).init()
  }
}

class SvgLoader {
  constructor (path) {
    this._path = path
    this._svgFiles = {}
    this._svgFileNames = []
  }

  _fileHandler (name) {
    fs.readFile(path.join(this._path, name), 'utf8', async (error, data) => {
      if (error) throw error
      if (SvgLoader.validate(name)) {
        this._svgFiles[path.basename(name, '.svg')] = await SvgNormalizer.normalize(data)
      } else {
        console.log('\x1b[31m', `\n\nФайл /svg/${name} не является svg`)
      }
    })
  }

  _fileLoad () {
    this._svgFileNames.forEach(this._fileHandler.bind(this))
  }

  init () {
    this._svgFileNames = fs.readdirSync(this._path)
    this._fileLoad()
    return this._svgFiles
  }

  static validate (filename) {
    return path.extname(filename) === '.svg'
  }

  static load (path, handler) {
    return new SvgLoader(path, handler).init()
  }
}

module.exports = {
  SvgLoader
}
