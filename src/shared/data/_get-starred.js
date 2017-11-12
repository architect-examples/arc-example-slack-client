var waterfall = require('run-waterfall')
var parallel = require('run-parallel')
var slack = require('slack')
var data = require('./_get-db')
var assert = require('@smallwins/validate/assert')

module.exports = function _getMessages(params, callback) {
  assert(params, {
    email: String,
  })
  waterfall([
    function getWorkspaces(callback) {
      data.accounts.query({
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': params.email
        }
      }, callback)
    },
    function getConversations(result, callback) {
      parallel(result.Items.map(account=> {
        return function _getConversations(callback) {
          slack.stars.list({
            token: account.token,
          },
          function _list(err, result) {
            if (err) {
              callback(err)
            }
            else {
              var acc = Object.assign(account, {stars:result.items})
              callback(null, acc)
            }
          })
        }
      }), callback) 
    }
  ], callback)
}
