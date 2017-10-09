var arc = require('@architect/functions')
var channels = require('./_get-channels')
var messages = require('./_get-messages')
var login = require('./_login')

exports.handler = arc.html.get(channels, messages, login)
