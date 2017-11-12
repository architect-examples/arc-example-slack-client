var arc = require('@architect/functions')
var data = require('@architect/shared/data')
var layout = require('@architect/shared/layout')
var login = require('./_login')
var home = require('./_home')
var button = require('./_button')

function debug(req, res, next) {
  if (req.session.account) {
    data.account.workspaces({
      email: req.session.account.email
    }, 
    function _query(err, result) {
      res({
        html: layout(`
          <pre>${JSON.stringify(req.session, null, 2)}</pre>
          <pre>${JSON.stringify(result, null, 2)}</pre>
          ${button}
        `)
      })  
    })
  }
  else {
    next()
  }
}

exports.handler = arc.html.get(login, debug, home)
