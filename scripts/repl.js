#!/usr/bin/env node
var data = require('../src/shared/data')
var workflows = require('@architect/workflows')
var repl = require('repl')
var chalk = require('chalk')
var prompt = chalk.green('#!/data> ')

var db = workflows.sandbox.db.start(x=> {
  var server = repl.start({prompt})
  server.context.data = data
  server.on('exit', function _on() {
    db.close()
  })
})

