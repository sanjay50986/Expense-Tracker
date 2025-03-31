const IncomeModel = require('../models/income.model.js');
const ExpenseModel = require('../models/expense.model.js');
const { isValidObjectId, Types } = require('mongoose');

const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Validate userId before using it
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // Convert userId to ObjectId (only if needed)
        const userObjectId = new Types.ObjectId(userId);

        // Calculate total income
        const incomeAggregation = await IncomeModel.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const totalIncome = incomeAggregation.length > 0 ? incomeAggregation[0].total : 0;

        // Calculate total expense
        const expenseAggregation = await ExpenseModel.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        const totalExpense = expenseAggregation.length > 0 ? expenseAggregation[0].total : 0;

        // Get income transactions in the last 60 days
        const last60DaysIncomeTransctions = await IncomeModel.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransctions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        // Get expense transactions in the last 60 days (fixed variable name)
        const last60DaysExpenseTransctions = await ExpenseModel.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total expense for last 60 days
        const expenseLast60Days = last60DaysExpenseTransctions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        // Fetch last 5 transactions (income + expense)
        const lastTransactions = [
            ...(await IncomeModel.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({
                ...txn.toObject(),
                type: "income",
            })),
            ...(await ExpenseModel.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({
                ...txn.toObject(),
                type: "expense",
            })),
        ].sort((a, b) => b.date - a.date); // Sort Latest First

        // Response JSON
        res.json({
            totalBalance: totalIncome - totalExpense,
            totalIncome,
            totalExpense,
            last60DaysExpense: {
                total: expenseLast60Days,
                transactions: last60DaysExpenseTransctions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransctions,
            },
            recentTransactions: lastTransactions,
        });

    } catch (error) {
        console.error("Error in getDashboardData:", error); // Log error for debugging
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = getDashboardData;
