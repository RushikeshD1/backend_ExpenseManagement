const Expense = require("../modalls/expenses");
const { create } = require("../modalls/userModel")

const createExpenses = async (req, res) =>{
    try {
        const {title, amount, date} = req.body

        if(!title || !amount){
            return res.status(400).json({
                success : false,
                message : "Please fill all fields"
            })
        }

        const userId = req.user._id;

        if(!userId){
            return res.status(400).json({
                success :false,
                message :"userId not found"
            })
        }
                
        const expensesData = await Expense.create({
            title,
            amount,
            date : date || Date.now(),
            user : userId
        })

        res.status(200).json({
            success : true, 
            message : "Expenses created!",
            expense : expensesData           
        })     
                
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Expenses not created",
            error
        })
    }
}

const getExpenses =async (req, res) => {
    try {
        const userId = req.user._id;

        const expense = await Expense.find({ user : userId}).sort({ date : -1})
        res.status(200).json({
            success: true,
            message: "Expenses fetched successfully",
            expense,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch expenses",
            error: error.message,
          });
    }
}

const expenseController = {
    createExpenses,
    getExpenses
}

module.exports = expenseController