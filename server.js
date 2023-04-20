const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// Database connection
const db = require("./config/db");
const userRouter = require("./router/users/userRouter");
db.connect();

// Router configuration
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
	res.send("Nodejs is started");
});

app.listen(port, () => {
	console.log(`Server is running at the port ${port}`);
});
