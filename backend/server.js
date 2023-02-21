const express = require("express");
const PORT = process.env.PORT || 3001;

//Server configuration
const app = express();

//Routes
const accountRouter = require("./routes/accountRouter.js");
app.use("/accounts", accountRouter);



app.get("/", (req, res) => {
    res.send("Hello World with Ahmad!");
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
