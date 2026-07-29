const express = require('express');
const router = express.Router();
const { getBooksByClass } = require('../controllers/bookController');

router.get('/class/:classNumber', getBooksByClass);

module.exports = router;
