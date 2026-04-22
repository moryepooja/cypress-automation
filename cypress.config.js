const { defineConfig } = require('cypress')
const fs = require('fs')
const path = require('path')

function getConfigurationByFile(file) {
  const filePath = path.resolve('cypress/config', `${file}.json`)
  return fs.existsSync(filePath) ? require(filePath) : {}
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://reqres.in',
    setupNodeEvents(on, config) {
      const file = config.env.config || 'dev'
      const envConfig = getConfigurationByFile(file)

      return {
        ...config,
        ...envConfig,
      }
    },
  },
})
