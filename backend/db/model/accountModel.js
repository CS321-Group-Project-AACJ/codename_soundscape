const mongoose = require("mongoose");

const { Schema, SchemaTypes, model } = mongoose;

const locationSchema = new Schema({
    name: { type: String, required: true },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
            required: true,
        },
        coordinates: [{ type: Number, required: true }],
    },
});

const accountSchema = new Schema({
    spotifyId: { type: String, required: true },
    location: { type: locationSchema, required: true },
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
    updatedAt: { type: Date, default: () => Date.now() },
    settings: {
        showCurrentlyPlaying: {
            type: Boolean,
            default: true,
        },
        showRecentlyPlayed: {
            type: Boolean,
            default: true,
        },
        showTopTracks: {
            type: Boolean,
            default: true,
        },
        showTopArtists: {
            type: Boolean,
            default: true,
        },
        showTopAlbums: {
            type: Boolean,
            default: true,
        },
        showTopGenres: {
            type: Boolean,
            default: true,
        },
        privateAccount: {
            type: Boolean,
            default: false,
        },
        location: String,
        lightTheme: {
            type: Boolean,
            default: true,
        },
    },
    searchHistory: [{ searchTerm: String }],
    savedLocations: [
        { type: SchemaTypes.ObjectId, ref: "Location", required: true },
    ],
});

const Account = model("Account", accountSchema);
const Location = model("Location", locationSchema);
module.exports = { Account, Location };

/* Account:
- spotify user account
- location (in coordinates)
- created at

searches
- previous searches

account settings
- show currently playing
- show recently played
- show top tracks
- show top artists
- show top albums
- show top genres
- private account
- location
- theme*/
