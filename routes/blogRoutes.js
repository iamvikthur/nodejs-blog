const express = require('express')
const blogController = require('../controllers/blogController')
const router = express.Router()

// index route
router.get('/', blogController.index)

// store route
router.post('/', blogController.store)

// create blog page
router.get('/create', blogController.create)

// update route
router.post('/update', blogController.update)

// show route
router.get('/edit/:id', blogController.edit)

// show route
router.get('/:id', blogController.show)

// delete route
router.delete('/:id', blogController.destroy)

module.exports = router
