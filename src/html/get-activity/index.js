var arc = require('@architect/functions')
var layout = require('@architect/shared/layout')
var auth = require('@architect/shared/auth')

function route(req, res) {
  res({
    html: layout(`hello world`)
  })
}

exports.handler = arc.html.get(auth, route)
