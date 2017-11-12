var style = `
* {
 box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.25;
  margin: 0;
}

select {
  width: 100%;
  padding: 1.5em;
  font-size: 1em;
}

.channels {
  position: fixed;
  top: 0;
  background: black;
  width: 100%;
}

.messages {
  margin-top: 85px;
}

.post {
  background: black;
  margin: 0;
  padding: 1.5em;
}

.post form {
  margin: 0;
  background: white;
  border-radius: 5px;
  padding: .5em;
  display:flex;
}

.post form input {
  border:none;
  font-size: 2em;
  flex-grow: 2;
}

.post form button {
  background: #666;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
}

`

module.exports = function layout(body) {
  return `
<html>
<head>
<title>Slackoff</title>
<meta name=viewport content=width=device-width,initial-scale=1>
<style>${style}</style>
</head>
<body>
${body}
<nav>
  <a href=/>workspaces</a>
  <a href=/messages>messages</a>
  <a href=/starred>starred</a>
  <a href=/activity>activity</a>
  <a href=/unread>unread</a>
</nav>
</body>
</html>
`
}
