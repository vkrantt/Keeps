const mongoose = require("mongoose");
const colors = require("colors");

const connectDatabase = async (req, res) => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(colors.blue(`Database connected on port - ${connection.host}`));
  } catch (error) {
    console.log(colors.red(`Database not connected - ${error}`));
    process.exit(1);
  }
};

module.exports = connectDatabase;
