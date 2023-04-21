export function ArtistsToString(artists) {
    if (!artists) return "";

    let artistsString = artists[0].name;
    if (artists.length > 1) {
        for (let i = 1; i < artists.length; i++) {
            const artist = artists[i];
            // console.log(artist);
            artistsString += `, ${artist.name}`;
        }
    }
    return artistsString;
}
