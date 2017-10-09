var slack = require('slack')
var layout = require('./_layout')

module.exports = function _login(req, res) {
  var clientID = process.env.SLACK_CLIENT_ID.replace(/"/g, '')
  var redirect = process.env.NODE_ENV==='testing'? 'http://localhost:3333': (process.env.NODE_ENV==='staging'? 'https://staging.slackoff.chat' : 'https://slackoff.chat')
  var scope = 'channels:history,channels:read,chat:write:user,groups:history,groups:read,im:history,im:read'
  var home = `
    <h1>Slackoff!</h1>
    <a href="https://slack.com/oauth/authorize?scope=${scope}&client_id=${clientID}&redirect_uri=${redirect}"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>`
  
  if (req.query.code) {
    slack.oauth.access({
      client_id: process.env.SLACK_CLIENT_ID.replace(/"/g, ''),
      client_secret: process.env.SLACK_CLIENT_SECRET,
      redirect_uri: redirect,
      code: req.query.code
    }, 
    function _access(err, result) {
      if (err) {
        res(err)
      }
      else {
        res({
          session: {
            token: result.access_token
          },
          location: req._url('/')
        })
      }
    })
  }
  else {
    res({
      html: layout(home)
    })
  }
}
