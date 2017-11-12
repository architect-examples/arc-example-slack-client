var arc = require('@architect/functions')
var layout = require('@architect/shared/layout')
var data = require('@architect/shared/data')
var auth = require('@architect/shared/auth')

function route(req, res) {
  data.account.messages({
    email: req.session.account.email 
  }, 
  function _messages(err, result) {
    if (err) {
      res(err)
    }
    else {
      var body = `<pre>${JSON.stringify(result, null, 2)}</pre>`
      res({
        html: layout(body)
      })
    }
  })
}

exports.handler = arc.html.get(auth, route)
