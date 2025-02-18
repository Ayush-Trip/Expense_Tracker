import React, { useEffect, useState } from "react";
import axios from "axios";
const ExpenseTracker = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/expenses");
      let result = 0;
      response.data.map((data) => {
        result += data.amount;
      });
	  setBalance(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = () => {
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setBalance((prevBalance) => prevBalance + parsedAmount);

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { description, amount: parsedAmount },
    ]);
    axios.post("http://localhost:5000/expenses", {
      description: description,
      amount: parsedAmount,
    });

    setDescription("");
    setAmount("");
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <div className="balance">
        <h2>
          Balance: $<span id="balance">{balance.toFixed(2)}</span>
        </h2>
      </div>
      <div className="transactions">
        <h2>Transactions</h2>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {`${transaction.description}: 
											$${transaction.amount.toFixed(2)}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="add-expense">
        <form>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="button" onClick={addExpense}>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseTracker;
