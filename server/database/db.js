const mongoose = require("mongoose");

const connectToDB = async () => {
  const db_url = process.env.db_url;
  await mongoose.connect(`${db_url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = connectToDB;
