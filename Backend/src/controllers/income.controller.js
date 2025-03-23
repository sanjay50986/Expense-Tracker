const IncomeModel = require("../models/income.model.js");
const xlsx = require('xlsx')


const addIncome = async (req, res) => {

    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        // validation Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        const newIncome = new IncomeModel({
            userId,
            icon,
            source,
            amount,
            date
        });

        await newIncome.save();
        res.status(200).json({
            message: "income save successfully",
            newIncome
        })

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await IncomeModel.find({ userId }).sort({ date: -1 });
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }

}

const deleteIncome = async (req, res) => {

    try {
        await IncomeModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        
        const income = await IncomeModel.find({userId}).sort({date: -1});

        //Prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx');
        res.download('income_details.xlsx');

    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}
module.exports = { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel }