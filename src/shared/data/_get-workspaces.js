var data = require('./_get-db')

module.exports = function _getWorkspaces(params, callback) {
  data.accounts.query({
    IndexName: 'email-index',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': params.email
    }
  }, 
  function _query(err, result) {
    if (err) callback(err)
    else callback(null, result.Items)
  })
}
