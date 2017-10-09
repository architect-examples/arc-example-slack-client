var arc = require('@architect/functions')
var slack = require('slack')

function route(req, res) {
  slack.chat.postMessage({
    token: req.session.token,
    channel: req.body.channel,
    text: req.body.msg
  }, 
  function _post(err) {
    if (err) {
      res(err)
    }
    else {
      res({
        location: `/?channel=` + req.body.channel
      })
    }
  })
}

exports.handler = arc.html.post(route)
