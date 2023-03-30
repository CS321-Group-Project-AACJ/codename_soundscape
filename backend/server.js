const express = require("express");
require("dotenv").config(); //for .env file
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const spotifyWebApi = require("spotify-web-api-node");

//Server configuration
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

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
