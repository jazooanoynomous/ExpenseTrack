const ExpenseSchema = require("../models/ExpenseModel")



// backend/controllers/expense.js
exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date, userid } = req.body;

    const receiptUrl = req.file ? req.file.path : null;

    if (!title || !category || !description || !date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (amount <= 0 || isNaN(amount)) {
        return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    try {
        const expense = new ExpenseSchema({
            title,
            amount,
            category,
            description,
            date,
            userid,
            receipt: receiptUrl
        });

        await expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.getExpenses = async (req, res) => {
    try {

        const {userid} = req.query;
        const expenses = await ExpenseSchema.find({ userid: userid }).sort({ createdAt: -1 });
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message :'Server Error'})
    }

}

exports.deleteExpense = async (req, res) => {

    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
        res.status(200).json({message :'Expense deleted.'})
    })
    .catch((err) => {
        res.status(500).json({message :'Server Error'})
    })
    
}