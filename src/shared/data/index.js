var login = require('./_login')
var workspaces = require('./_get-workspaces')
var messages = require('./_get-messages')
var starred = require('./_get-starred')
var unread = require('./_get-unread')

module.exports = {
  account: {
    login, 
    workspaces, 
    messages, 
    starred,
    unread,
  }
}
