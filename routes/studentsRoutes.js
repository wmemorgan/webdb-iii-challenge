const router = require('express').Router()
const knex = require('knex')
const dbConfig = require('../data/knexfile')
const db = require('../data/dataModels')
const knexdb = knex(dbConfig.development)

// Load middleware
const idBodyCheck = [requiredData, validateStudentId]

// ==== GET ==== //
router.get('/', async (req, res) => {
  try {
    let data = await db.find('students')
    res.json(data)
  }
  catch (err) {
    res.status(500).json(err.message)
  }
})

router.get('/:id', validateStudentId, async (req, res) => {
  try {
    let data = await knexdb.from('cohorts')
      .innerJoin('students', 'cohorts.id', 'students.cohort_id')
      .where('students.id', req.data.id)
      .select({id: 'students.id', name: 'students.name', cohort: 'cohorts.name'})

    res.json(data)
  }
  catch (err) {
    res.status(500).json(err.message)
  }
})

// ==== POST ==== //
router.post('/', requiredData, async (req, res) => {
  try {
    let data = await db.insert(req.body, 'students')
    res.status(201).json(data)
  }
  catch (err) {
    res.status(500).json(err.message)
  }
})

// ==== PUT ==== //
router.put('/:id', idBodyCheck, async (req, res) => {
  try {
    let data = await db.update(req.data.id, req.body, 'students')
    res.json(data)
  }
  catch (err) {
    res.status(500).json(err.message)
  }
})

// ==== DELETE ==== //
router.delete('/:id', validateStudentId, async (req, res) => {
  try {
    let data = await db.remove(req.data.id, 'students')
    res.json(data)
  }
  catch (err) {
    res.status(500).json(err.message)
  }
})

// Custom middleware
async function validateStudentId(req, res, next) {
  try {
    let data = await db.findById(req.params.id, 'students')
    if (data) {
      req.data = data
      next()
    } else {
      res.status(404).json({ message: `Student ID ${req.params.id} not found` })
    }
  }
  catch (err) {
    res.status(500).json(err.message)
  }
}

const inputDataChecker = (arr, target) => target.every(v => arr.includes(v))

function requiredData(req, res, next) {
  const requiredFields = ["name"]
  console.log(`inputDataChecker: `, inputDataChecker(Object.keys(req.body), requiredFields))
  if (!req.body || !Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing user data" })
  } else if (!inputDataChecker(Object.keys(req.body), requiredFields)) {
    res.status(400).json({ message: "Missing required field." })
  } else {
    next()
  }
}

module.exports = router