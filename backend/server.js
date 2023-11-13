const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URL;
mongoose.connect(uri, { dbName: "notestack", useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

const stacksRouter = require("./routes/stacks.route");
const usersRouter = require("./routes/users.route");

app.use("/stacks", stacksRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
