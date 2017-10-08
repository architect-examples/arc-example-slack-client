var arc = require('@architect/functions')
var parallel = require('run-parallel')
var slack = require('slack')


function route(req, res) {
  // console.log(JSON.stringify(req, null, 2))
  var clientID = '3719344088.252544474608' // process.env.SLACK_CLIENT_ID
  var redirect = process.env.NODE_ENV==='testing'? 'http://localhost:3333': (process.env.NODE_ENV==='staging'? 'https://staging.slackoff.chat' : 'https://slackoff.chat')
  var scope = 'channels:history,channels:read,chat:write:user,groups:history,groups:read,im:history,im:read'
  var doc = `<html><body><h1>Slackoff!</h1><a href="https://slack.com/oauth/authorize?scope=${scope}&client_id=${clientID}&redirect_uri=${redirect}"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a></body></html>`

  if (req.session.token && !req.query.channel) {
    slack.conversations.list({
      token: req.session.token, 
    },
    function _list(err, results) {
      res({
        location: '/?channel=' + results.channels[0].id
      }) 
    }) 
  }
  else if (req.session.token && req.query.channel) {
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
        var style = 'select {width:100%}'
        var channels = results.find(r=> r.hasOwnProperty('channels')).channels.map(chan=> `<option ${chan.id === req.query.channel? "selected":""} value=${chan.id}>${chan.name}<option>`).join('')
        var messages = results.find(r=> r.hasOwnProperty('messages')).messages.map(msg=> `${msg.user} &rarr; ${msg.text}`).join('<br>')
        res({
          html: `<style>${style}</style><select onchange="window.location='/?channel=' + this.value">${channels}</select><hr>` + messages
        })
      }
    })
  }
  else if (req.query.code) {
    slack.oauth.access({
      client_id: process.env.SLACK_CLIENT_ID.replace(/"/g, ''),
      client_secret: process.env.SLACK_CLIENT_SECRET,
      redirect_uri: redirect,
      code: req.query.code
    }, 
    function _access(err, result) {
      if (err) {
        console.log(err)
        res({html:'failed'})
      }
      else {
        res({
          session: {token:result.access_token},
          location: req._url('/')
        })
      }
    })
  }
  else {
    res({
      html: doc
    })
  }
}

exports.handler = arc.html.get(route)
