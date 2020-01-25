const path = require('path')

module.exports = {
  'configureWebpack': {
    'resolve': {
      'alias': {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  'css': {
    'loaderOptions': {
      'stylus': {
        'use': [
          null,
          null
        ],
        'import': [
          '~nib/lib/nib/index.styl'
        ]
      }
    }
  },
  'transpileDependencies': [
    'vuetify'
  ]
}
