var slack = require('slack')
var data = require('@architect/shared/data')
var layout = require('@architect/shared/layout')
var home = require('./_unauthenticated-home')

module.exports = function _login(req, res, next) {
  var code = req.query.code
  if (code) {
    data.account.login({
      code
    },
    function _login(err, account) {
      if (err) {
        res(err)
      }
      else {
        res({
          session: {account},
          location: req._url('/')
        })
      }
    })
  }
  else {
    next()
  }
}
