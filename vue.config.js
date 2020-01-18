module.exports = {
  'configureWebpack': {
    'resolve': {
      'alias': {
        '@': '/Users/macbookpro/Projects/front-crm.loc/src'
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
