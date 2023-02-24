const PORT = process.env.PORT || 3001;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Server configuration
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

//Routes
const accountRouter = require("./routes/accountRouter.js");
app.use("/accounts", accountRouter);

app.get("/", (req, res) => {
    res.send("Hello World with Ahmad!");
});

app.get("/test", (req, res) => {
    res.redirect("/accounts");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
