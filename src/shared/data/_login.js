var client = process.env.SLACK_CLIENT_ID.replace(/"/g, '')
var secret = process.env.SLACK_CLIENT_SECRET
var waterfall = require('run-waterfall')
var slack = require('slack')
var data = require('./_get-db')
var redirect = require('./_get-redirect')
var assert = require('@smallwins/validate/assert')

/**
 * creates an account
 * see the schema in .arc for the accounts table
 */
module.exports = function login(params, callback) {
  assert(params, {
    code: String
  })
  var {code} = params
  var token
  var account
  waterfall([
    function _getAccessToken(callback) {
      slack.oauth.access({
        client_id: client,
        client_secret: secret,
        redirect_uri: redirect,
        code,
      }, callback)
    },
    function _getIdentity(result, callback) {
      token = result.access_token
      slack.auth.test({
        token
      }, callback) 
    },
    function _getProfile(result, callback) {
      account = {
        slackID: `${result.team_id}-${result.user_id}`, 
        name: result.user,
        teamName: result.team,
        teamUrl: result.url,
        token,
      }
      slack.users.info({
        user: result.user_id,
        token,
      }, callback)
    },
    function _setupAccount(result, callback) {
      account.realName = result.user.profile.real_name
      account.email = result.user.profile.email
      account.avatar = result.user.profile.image_48
      slack.team.info({
        token
      }, callback)
    },
    function _addTeamIcon(result, callback) {
      account.teamAvatar = result.team.icon.image_88
      // update teh db
      data.accounts.put(account, callback)
    }
  ], callback)
}
