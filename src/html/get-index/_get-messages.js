var slack = require('slack')
var parallel = require('run-parallel')
var layout = require('./_layout')

module.exports = function _getMessages(req, res, next) {
  if (req.session.token && req.query.channel) {
    parallel([
      function _getConvos(callback) {
        slack.conversations.list({
          token: req.session.token, 
        }, callback) 
      },
      function _getHist(callback) {
        slack.conversations.history({
          token: req.session.token,
          channel: req.query.channel,
        }, callback) 
      }
    ], 
    function _render(err, results) {
      if (err) {
        res(err)
      }
      else {
         var channels = results.find(r=> r.hasOwnProperty('channels')).channels.map(chan=> `<option ${chan.id === req.query.channel? "selected":""} value=${chan.id}>${chan.name}<option>`).join('')
        var messages = results.find(r=> r.hasOwnProperty('messages')).messages.map(msg=> `${msg.user} &rarr; ${msg.text}`).join('<br>')
        res({
          html: layout(`<select onchange="window.location='/?channel=' + this.value">${channels}</select><hr>` + messages)
        })
      }
    })
  }
  else {
    next()
  } 
}
