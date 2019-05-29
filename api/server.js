const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')

// Import resource routes
const cohortsRoutes = require('../routes/cohortsRoutes')
const studentsRoutes = require('../routes/studentsRoutes')

const server = express()

// Load middleware
server.use(helmet())
server.use(express.json())
server.use(logger('dev'))

// Activate Routes
server.use('/api/cohorts', cohortsRoutes)
server.use('/api/students', studentsRoutes)
server.use('/', (req, res) => {
  res.send(`<h1>Welcome to the Lambda App API</h1>`)
})

module.exports = server