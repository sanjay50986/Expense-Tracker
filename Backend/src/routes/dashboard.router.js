const express = require('express');
const {protect} = require('../middleware/auth.middleware.js');
const router = express.Router();
const getDashboardData = require("../controllers/dashboard.controller.js")

router.get('/', protect, getDashboardData)

module.exports = router;