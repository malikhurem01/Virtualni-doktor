const express = require('express');

const router = express.Router();
const appointmentsController = require('../controllers/appointments');

router.post('/make', appointmentsController.make);

module.exports = router;
