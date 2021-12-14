const withTM = require('next-transpile-modules')(['@m3o-ui/auth'])

module.exports = withTM({
  reactStrictMode: true
})
