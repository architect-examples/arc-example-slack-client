var testing = process.env.NODE_ENV==='testing'
var staging = process.env.NODE_ENV==='staging'
module.exports = testing? 'http://localhost:3333': (staging? 'https://staging.slackoff.chat' : 'https://slackoff.chat')
