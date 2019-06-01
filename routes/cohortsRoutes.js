const router = require('express').Router()

const db = require('../data/dataModels')

// Load middleware
const idBodyCheck = [requiredData, validateCohortId]

// ==== GET ==== //
router.get('/', async (req, res) => {
  try {
    let data = await db.find('cohorts')
    res.json(data)
  }
  catch (err) {
    res.status(500).json(err.message)
  }
})

router.get('/:id', validateCohortId, (req, res) => {
  res.json(req.data)
})

router.get('/:id/students', validateCohortId, async (req, res) => {
 try {
   let data = await db.innerJoin('cohorts', 
   'students', 'cohorts.id', 'students.cohort_id', req.data.id)
   res.json(data)
 }
 catch (err) {
   res.status(500).json(err.message)
 }
})

// ==== POST ==== //
router.post('/', requiredData, async (req, res) => {
  try {
    let data = await db.insert(req.body, 'cohorts')
    res.status(201).json(data)
  }
  catch (err) {
    res.status(500).json(err.message)
  }
})

// ==== PUT ==== //
router.put('/:id', idBodyCheck, async (req, res) => {
  try {
    let data = await db.update(req.data.id, req.body, 'cohorts')
    res.json(data)
  }
  catch (err) {
    res.status(500).json(err.message)
  }
})

// ==== DELETE ==== //
router.delete('/:id', validateCohortId, async (req, res) => {
  try {
    let data = await db.remove(req.data.id, 'cohorts')
    res.json(data)
  }
  catch (err) {
    res.status(500).json(err.message)
  }
})

// Custom middleware
async function validateCohortId(req, res, next) {
  try {
    let data = await db.findById(req.params.id, 'cohorts')
    if (data) {
      req.data = data
      next()
    } else {
      res.status(404).json({ message: `Cohort ${req.params.id} not found` })
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