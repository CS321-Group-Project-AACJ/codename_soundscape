const express = require("express");
const accounts = require("../data/accounts.json");
// const db = require("../db/database.js");
const { Account, Location, Song } = require("../db/model/accountModel.js");
const SpotifyWebApi = require("spotify-web-api-node");

const router = express.Router();

router.get("/", (req, res) => {
    res.json(accounts);
});

router.post("/register", async (req, res, next) => {
    try {
        const spotifyApi = new SpotifyWebApi({
            redirectUri: "http://localhost:3000",
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        });
        const { accessToken } = req.body;
        // console.log(accessToken);
        if (!accessToken) {
            // console.log("handle error here");
            throw new Error("No access token provided");
        }
        spotifyApi.setAccessToken(accessToken);

        const response = await spotifyApi.getMe();
        const userData = response.body;
        // console.log(userData);

        const existingAccount = await Account.exists({
            spotifyId: userData.id,
        });
        if (existingAccount) {
            res.json(
                "An account has already been made for you. We did nothing."
            );
            return;
        }
        const { longitude, latitude } = req.body;
        // console.log(longitude);

        const newLocation = await Location({
            name: "Default",
            location: { coordinates: [longitude, latitude] },
        });
        const newAccount = await Account.create({
            spotifyId: userData.id,
            location: newLocation,
        });
        res.json(newAccount);
    } catch (error) {
        console.log("We had trouble creating the account");
        error.status = 500;
        next(error);
    }
});

router.post("/test-register", async (req, res, next) => {
    try {
        const { spotifyId } = req.body;
        const existingAccount = await Account.exists({
            spotifyId: spotifyId,
        });
        if (existingAccount) {
            res.json(
                "An account has already been made for you. We did nothing."
            );
            return;
        }
        const { longitude, latitude } = req.body;
        console.log(longitude);

        const newLocation = await Location({
            name: "Default",
            location: { coordinates: [longitude, latitude] },
        });
        const newAccount = await Account.create({
            spotifyId: spotifyId,
            location: newLocation,
        });
        res.json(newAccount);
    } catch (error) {
        console.log("We had trouble creating the account");
        error.status = 500;
        next(error);
    }
});

router.get("/search", async (req, res, next) => {
    try {
        const { searchText } = req.query;
        // console.log(typeof searchText);
        const results = await Account.find({
            spotifyId: { $regex: searchText, $options: "i" },
        });
        // console.log(results);
        res.json(results);
    } catch (error) {
        console.log("We had trouble searching the account");
        error.status = 500;
        next(error);
    }
});

router.patch("/songs/current-playing", async (req, res, next) => {
    try {
        const { spotifyId } = req.body;
        console.log(`Spotify Id: ${spotifyId}`);
        const { songId } = req.body.songData;

        const newCurrentSong = await Song({
            songId,
        });
        console.log(newCurrentSong);

        await Account.updateOne(
            { spotifyId: spotifyId },
            {
                "currentSong.song": newCurrentSong,
                "currentSong.updatedAt": Date.now(),
            }
        );
        res.json("Updated current song");
    } catch (error) {
        console.log("We had trouble updating your currently playing song");
        error.status = 500;
        next(error);
    }
});

router.patch("/songs/recents", async (req, res, next) => {
    try {
        const { spotifyId, songIds } = req.body;
        console.log(`Spotify Id: ${spotifyId}`);
        console.log(songIds);

        // const newCurrentSong = await Song({
        //     songId,
        // });
        // console.log(newCurrentSong);

        const songArr = songIds.map((songId) => {
            return Song({
                songId,
            });
        });

        await Account.updateOne(
            { spotifyId: spotifyId },
            {
                "recentSongs.songIds": songArr,
                "recentSongs.updatedAt": Date.now(),
            }
        );
        res.json("Updated current song");
    } catch (error) {
        console.log("We had trouble updating your currently playing song");
        error.status = 500;
        next(error);
    }
});

router.get("/songs/current-playing", async (req, res, next) => {
    try {
        const { spotifyId } = req.query;
        // console.log(`Spotify Id: ${spotifyId}`);

        const user = await Account.findOne({ spotifyId: spotifyId });
        // console.log(user);
        const { songId } = user.currentSong.song;
        res.json(songId);
    } catch (error) {
        console.log("We had trouble getting your currently playing song");
        error.status = 500;
        next(error);
    }
});

router.get("/songs/recents", async (req, res, next) => {
    try {
        const { spotifyId } = req.query;
        // console.log(`Spotify Id: ${spotifyId}`);

        const user = await Account.findOne({ spotifyId: spotifyId });
        // console.log(user);
        const { songIds } = user.recentSongs;
        res.json(songIds);
    } catch (error) {
        console.log("We had trouble getting your currently playing song");
        error.status = 500;
        next(error);
    }
});



router.get("/home", async (req, res, next) => {
    try {
        const { spotifyId, maxDistance } = req.query;
        const myAccount = await Account.findOne({ spotifyId: spotifyId });
        console.log(myAccount);

        let locationQuery = {
            $and: [
                {
                    "location.location": {
                        $near: {
                            // $maxDistance: 260000,
                            $geometry: {
                                type: "Point",
                                coordinates: [
                                    myAccount.location.location.coordinates[0],
                                    myAccount.location.location.coordinates[1],
                                ],
                            },
                        },
                    },
                },
                { spotifyId: { $ne: spotifyId } },
            ],
        };

        const results = await Account.find(locationQuery);
        // console.log(results);
        res.json(results);
    } catch (error) {
        console.log("We had trouble on our end");
        error.status = 500;
        next(error);
    }
});

router.get("/db", async (req, res) => {
    // {"location.location": {$near: {$maxDistance: 260000, $geometry: {type: "Point", coordinates: [lng, lat]}}}}
    let locationQuery = {
        $and: [
            {
                "location.location": {
                    $near: {
                        $maxDistance: 260000,
                        $geometry: { type: "Point", coordinates: [-77, 38] },
                    },
                },
            },
            { spotifyId: { $ne: "its_dannyj" } },
        ],
    };
    const name = "Jordan";
    // const newAccount = new Account({
    //     spotifyId: "its_dannyj"
    // });
    // await newAccount.save();

    const longitude = -118.25413963773347;
    const latitude = 33.913758675109705;
    const newLocation = await Location({
        name: "LA",
        location: { coordinates: [longitude, latitude] },
    });
    const existingAccount = await Account.exists({ spotifyId: name });
    const newAccount = await Account.create({
        spotifyId: "LA",
        location: newLocation,
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
