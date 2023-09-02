const express = require("express");
const colors = require("colors");
const cors = require("cors");
const connectDatabase = require("./server/database/connectdb");
require("dotenv").config({ path: ".env" });

// server
const server = express();
server.use(express.json());
server.use(cors());

// connect with db
connectDatabase();

// initial route
server.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    server: "keeps",
    version: "1.0.0",
  });
});

// routes
server.use("/api/user", require("./server/routes/user.route"));
server.use("/api/note", require("./server/routes/note.route"));

// port
const port = process.env.PORT || 3030;

// server listening
server.listen(port, () => {
  console.log(colors.yellow(`server running on http://localhost:${port}`));
});
