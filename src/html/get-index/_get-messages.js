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
      },
      function _getPpl(callback) {
        slack.users.list({
          token: req.session.token
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
          return `${pplFmt(msg.user)} &rarr; ${msg.text}`
        }
        
        function pplFmt(idx) {
          var person = ppl.find(p=> p.id === idx) 
          if (person) { 
            return person.name || person.profile.display_name
          }
          else {
            return 'unknown'
          }
        }

        var isChan = r=> r.hasOwnProperty('channels')
        var isMsg = r=> r.hasOwnProperty('messages')
        var isPpl = r=> r.hasOwnProperty('members')

        var ppl = results.find(isPpl).members
        var channels = results.find(isChan).channels.map(channelFmt).join('')
        var messages = results.find(isMsg).messages.map(msgFmt).reverse().join('<br>')

        body = ''
        body += `<div class=channels><select onchange="window.location='/?channel=' + this.value">${channels}</select></div>`
        body += `<div class=messages>${messages}</div>`
        body += `<div class=post>
          <form action=/ method=POST>
            <input type=hidden name=channel value=${req.query.channel}>
            <input type=text name=msg>
            <button>Send</button>
          </form>
        </div>`
        body += '<script>window.scrollTo(0, document.body.scrollHeight)</script>'

        res({
          html: layout(body)
        })
      }
    })
  }
  else {
    next()
  } 
}
