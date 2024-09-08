import React, { useEffect, useState } from 'react';






function SavedTracks({getSavedSongs, responseState}) {
const [ savedSongs, setSavedSongs ] = useState([]);




//have the actual function to get saved tracks called using useEffect on page load? and only change is savedSongs changed (so in displacement array)
// [savedSongs]. but write function in app.js page, then pass down to this child.

useEffect(() => {
   
  async function fetchSavedSongs() {
    try {
        const songs = await getSavedSongs(); // Await the result of the async function
        console.log('Fetched Songs:', songs);
        setSavedSongs(songs);
      } catch (error) {
        console.error('Error fetching saved songs:', error);
      }
    
}
  fetchSavedSongs();
  console.log('Your saved playlist is: ' + savedSongs);
}, [responseState, getSavedSongs]) //added getSavedSongs to dependency array
//as netlify wouldn't build the website without it


/*{savedSongs.map((savedPlaylist) => {
    <div key={savedPlaylist.id}>
    <p>{savedPlaylist.name}</p>
  </div>
 })}*/

    return (
      <div>
        <p>Existing playlists</p>
        {Array.isArray(savedSongs) && savedSongs.map((savedPlaylist) => (
          <div key={savedPlaylist.id}>
          <p>{savedPlaylist.name}</p>
          </div>
        ))}
      </div>
    )
}
export default SavedTracks;