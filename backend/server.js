const express = require("express");
require("dotenv").config(); //for .env file
const PORT = process.env.PORT || 3001;
const connectionString = process.env.DATABASE_URL || "";
const cors = require("cors");
const bodyParser = require("body-parser");
const spotifyWebApi = require("spotify-web-api-node");
const mongoose = require("mongoose");

//Server configuration
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

//Database setup
mongoose.connect(connectionString);
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database connected");
});

//Routes
const accountRouter = require("./routes/accountRouter.js");
app.use("/accounts", accountRouter);

const authenticationRouter = require("./routes/authenticationRouter.js");
app.use("/auth", authenticationRouter);

app.get("/", (req, res) => {
    res.send("Hello World with Ahmad!");
});

app.get("/home", (req, res) => {
    res.send("Home page");
});

app.get("/test", (req, res) => {
    res.redirect("/accounts");
});

app.get("/test/error", (req, res) => {
    if (true) {
        const error = new Error("Custom error message");
        error.status = 400;
        throw error;
    }
    res.send({ data: "hey" });
});

// Error handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        error: err.message || "There was an error on our end",
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
