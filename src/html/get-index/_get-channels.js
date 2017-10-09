var slack = require('slack')

module.exports = function _getChannels(req, res, next) {
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
  else {
    next()
  }
}
