const clientId = 'c6a1e5f9f39840858db5e710421b531b'; // Insert client ID here.
const redirectUri = 'http://localhost:3000/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
        let scopes = 'playlist-modify-public playlist-read-private user-library-read';
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(scopes)}&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },
  search(songToSearch) {
    const accessToken = Spotify.getAccessToken();
    console.log(`access token assigned: ${accessToken}`);
    console.log(`SongToSearch is: ${songToSearch}`)
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${songToSearch}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }); 
  }
};

export default Spotify;
export {accessToken};