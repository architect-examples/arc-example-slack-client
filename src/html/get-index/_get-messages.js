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
        function channelFmt(channel) {
          return `<option ${channel.id === req.query.channel? "selected":""} value=${channel.id}>${channel.name}</option>`
        }
        function msgFmt(msg) {
          return `${msg.user} &rarr; ${msg.text}`
        }
        var isChan = r=> r.hasOwnProperty('channels')
        var isMsg = r=> r.hasOwnProperty('messages')
        var channels = results.find(isChan).channels.map(channelFmt).join('')
        var messages = results.find(isMsg).messages.map(msgFmt).join('<br>')
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
