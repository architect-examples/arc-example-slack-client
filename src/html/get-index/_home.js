var layout = require('@architect/shared/layout')
var home = require('./_unauthenticated-home')

module.exports = function _home(req, res, next) {
  res({
    html: layout(home)
  })
}
