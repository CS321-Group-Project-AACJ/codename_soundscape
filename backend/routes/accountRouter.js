const express = require("express");
const accounts = require("../data/accounts.json");
// const db = require("../db/database.js");
const {Account, Location} = require("../db/model/accountModel.js");

const router = express.Router();

router.get("/", (req, res) => {
    res.json(accounts);
});

router.get("/db", async (req, res) => {
    const name = "Jordan";
    // const newAccount = new Account({
    //     spotifyId: "its_dannyj"
    // });
    // await newAccount.save();
    const longitude = 6;
    const latitude = 9;
    const newLocation = await Location.create({
        name: "Home",
        location: {coordinates: [longitude, latitude]}
    });
    const newAccount = await Account.create({
        spotifyId: "its_dannyj",
        location: newLocation._id,
    });
    // newAccount.findOne({location: {$geoWithin}})
    /*spotifyId: String,
    location: String,
    createdAt: Date,
    updatedAt: Date,
    settings: {
        showCurrentlyPlaying: Boolean,
        showRecentlyPlayed: Boolean,
        showTopTracks: Boolean,
        showTopArtists: Boolean,
        showTopAlbums: Boolean,
        showTopGenres: Boolean,
        privateAccount: Boolean,
        location: String,
        lightTheme: Boolean,
    },
    searchHistory: [{ searchTerm: String }], */
    res.json(name);
});

router.post("/test", (req, res) => {
    accounts.push(req.body);
    res.json(accounts);
});

module.exports = router;
