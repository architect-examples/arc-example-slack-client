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
`

module.exports = function layout(body) {
  return `
<html>
<head>
<title>Slackoff</title>
<meta name=viewport content=width=device-width,initial-scale=1>
<style>${style}</style>
</head>
<body>${body}</body>
</html>
`
}
