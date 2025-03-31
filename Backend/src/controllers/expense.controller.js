const ExpenseModel = require("../models/expense.model.js");
const xlsx = require('xlsx')


const addExpense = async (req, res) => {
    const userId = req.user.id;    

    try {
        const { icon, category, amount, date } = req.body;        

        // validation Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        const newExpense = new ExpenseModel({
            userId,
            icon,
            category,
            amount,
            date
        });        

        await newExpense.save();
        res.status(200).json({
            message: "Expense save successfully",
            newExpense
        })

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await ExpenseModel.find({ userId }).sort({ date: -1 });
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }

}

const deleteExpense = async (req, res) => {

    try {
        await ExpenseModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        
        const expense = await ExpenseModel.find({userId}).sort({date: -1});

        //Prepare data for excel
        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');

    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}
module.exports = { addExpense, getAllExpense, deleteExpense, downloadExpenseExcel }