const express = require('express')
const { populate, getCategories } = require('../controllers/marketplace')
const router = express.Router()

router.post('/marketplace/populate', populate)
router.get('/marketplace/results/:id', getCategories)

module.exports = router