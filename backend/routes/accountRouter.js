const express = require("express");
const accounts = require("../data/accounts.json");

const router = express.Router();

router.get("/", (req, res) => {
    res.json(accounts);
});

router.post("/test", (req, res) => {
    accounts.push(req.body);
    res.json(accounts);
});

module.exports = router;
