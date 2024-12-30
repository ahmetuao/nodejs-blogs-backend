const express = require('express');
const router = express.Router();
const { exampleController } = require('../controllers/exampleController');

// GET /api/example
router.get('/', exampleController);

module.exports = router;
