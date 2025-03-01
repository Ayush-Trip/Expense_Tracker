const Expense = require("../models/expenseModel")
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const postExpenses = async (req, res) => {
  const { description, amount } = req.body;

  try {
    if (!description || !amount) {
      return res
        .status(400)
        .json({ message: "Description and amount are required." });
    }

    const newExpense = new Expense({ description, amount });
    await newExpense.save();
    res.json(newExpense);
  } catch (error) {
    console.error("Error saving expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {getExpenses, postExpenses};