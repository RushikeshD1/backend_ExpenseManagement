const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    amount:{
        type: Number,
        required : true
    },
    date:{
        type: Date,
        required : true,
        default : Date.now
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required : true
    }
})

const Expense = mongoose.model("expenses", expenseSchema);

module.exports = Expense