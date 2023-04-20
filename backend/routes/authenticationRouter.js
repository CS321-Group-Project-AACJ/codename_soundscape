const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const router = express.Router();

router.post("/login", async (req, res, next) => {
    try {
        const { code } = req.body;

        const spotifyApi = new SpotifyWebApi({
            redirectUri: "http://localhost:3000/home",
            clientId: "cdd8517c97db4dca8fa03c9bfa9ef559",
            clientSecret: "8365399e3ef94b52bde4654b5d003dc4",
        });

        const data = await spotifyApi.authorizationCodeGrant(code);
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        });
    } catch (error) {
        error.status = 400;
        next(error);
    }
});

router.post("/refresh", async (req, res, next) => {
    try {
        console.log("I ran");
        const { refreshToken } = req.body;

        const spotifyApi = new SpotifyWebApi({
            redirectUri: "http://localhost:3000",
            clientId: "cdd8517c97db4dca8fa03c9bfa9ef559",
            clientSecret: "8365399e3ef94b52bde4654b5d003dc4",
            refreshToken,
        });

        const data = await spotifyApi.refreshAccessToken();
        // console.log(data.body);
        // console.log("The access  token has been refreshed!");
        // spotifyApi.setAccessToken(data.body["access_token"]);
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        })
    } catch (error) {
        console.log("Could not refresh the access token");
        error.status = 400;
        next(error);
    }
});

// router.post("/test", (req, res) => {
//     accounts.push(req.body);
//     res.json(accounts);
// });

module.exports = router;
