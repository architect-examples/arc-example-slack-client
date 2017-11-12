var path = require('path')
var arc = require('@architect/data')
// if we're NODE_ENV testing do not pass in .arc
// otherwise pass it in from the root of this dir
var arcPath = '/var/task/node_modules/@architect/shared/.arc' 
module.exports = process.env.NODE_ENV === 'testing'? arc() : arc(arcPath)
