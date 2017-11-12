@app
slack-txt

@html
# reads
get /
get /messages
get /starred
get /activity
get /unread
get /logout
# writes
post /
post /logout

@domain
slackoff.chat

@tables
accounts
  email *String 
  slackID **String # teamID-userID
  #name
  #teamName
  #teamUrl
  #token
  #realName
  #avatar
  #teamAvatar

@indexes
accounts
  slackID *String

accounts
  email *String
