var redirect = require('./_get-redirect')
var scopes = require('./_get-scopes')
var clientID = process.env.SLACK_CLIENT_ID.replace(/"/g, '')
var scope = scopes.join(',')

module.exports = `
<h1>Slackoff!</h1>
<a href="https://slack.com/oauth/authorize?scope=${scope}&client_id=${clientID}&redirect_uri=${redirect}"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>`
