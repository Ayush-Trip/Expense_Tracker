const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDB = require("./database/db");
const { getExpenses, postExpenses } = require("./controllers/expenses");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectToDB();

app.get("/expenses", getExpenses)

app.post("/expenses", postExpenses)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
