const express = require("express")
const { createExpenses, getExpenses } = require("../controllers/expenseController")
const authenticate = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/create", authenticate, createExpenses)
router.get("/all", authenticate, getExpenses)

module.exports = router