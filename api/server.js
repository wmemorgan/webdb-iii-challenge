const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')

const server = express()

// Load middleware
server.use(helmet())
server.use(express.json())
server.use(logger('dev'))

server.use('/', (req, res) => {
  res.send(`<h1>Welcome to the Lambda App API</h1>`)
})

module.exports = server