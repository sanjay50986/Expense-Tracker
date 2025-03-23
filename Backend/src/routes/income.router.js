const express = require('express');
const { protect } = require('../middleware/auth.middleware.js');

const router = express.Router();

const {addIncome,
    getAllIncome,
    downloadIncomeExcel,
    deleteIncome

} = require("../controllers/income.controller.js")

router.post("/add", protect, addIncome)
router.get("/get", protect, getAllIncome)
router.get("/downloadexcel", protect, downloadIncomeExcel)
router.delete("/:id", protect, deleteIncome)


module.exports = router