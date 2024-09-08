import './App.css';
import SearchBar from './SearchBar/SearchBar.js';
import SearchResults from './SearchResults/SearchResults.js';
import React, { useState, useEffect } from 'react';
import Playlist from "./Playlist/Playlist.js";
import Spotify from './setUpUserSpotify/setUpUserSpotify.js';
import SavedTracks from './savedTracks/savedTracks.js';
//import { accessToken } from './setUpUserSpotify/setUpUserSpotify.js';


function App() {

  const [ songSearch, setSongSearch ] = useState('');
  const [ playlist, setPlaylist ] = useState([]);
  const [ playlistName, setPlaylistName ] = useState('');
  const [ userAccountPlaylist, setUserAccountPlaylist ] = useState([]);
  const [ userAccessToken, setUserAccessToken ] = useState('');
  const [ searchResultsData, setSearchResultsData ] = useState([]);
  const [ responseState, setResponseState ] = useState('');  
  

  function handleSongSearch(e) {
    e.preventDefault();
    const songToSearch = e.target.value;
    setSongSearch(songToSearch);
  }

  function handlePlaylistName(e) {
    e.preventDefault();
    const newPlaylistName = e.target.value;
    setPlaylistName(newPlaylistName);
  }


  function handleAddSong(e) {
    const songToAdd = JSON.parse(e.target.value);
    console.log("You are adding to the playlist:" + songToAdd);

    //const convertedSongToAdd = JSON.stringify(songToAdd, null, 2);

    console.log("Now we're adding: " + songToAdd);
    setPlaylist((prev) => {
      // Check if the item already exists in the array
      if (prev.some(prev => prev.id === songToAdd.id))  {
        return prev; // Return the previous state if the item exists
      }
    return [...prev, songToAdd];
    //if (prev.some(song => song.id === songToAdd.id)) {
      //return prev;
    // its currently not adding to the plylist after first click, because that would duplicate [object object], so that problem
    //should be fixed when i fix this problem.,
  })
    console.log("the tracks in the playlist are: " + playlist);
    //this should add the specific song result object to the playlist array state.
    // will probably want some code to prevent the same song being added endlessly: . 
  }

  async function getSavedSongs() {
    const accessToken = Spotify.getAccessToken();

    const initialResponse = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }}); //this is to get the user's ID, for the next step.
    const userIDMaterial = await initialResponse.json();
    console.log(userIDMaterial);
    //console.log(userIDMaterial.id);
    const userID = userIDMaterial.id;
    console.log(userID);

    const limit = 20;
    const requestURL = `https://api.spotify.com/v1/users/${userID}/playlists?limit=${limit}`;
    console.log(requestURL);
    const response = await fetch(requestURL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }})

    if (!response.ok) {
      console.error('Failed to fetch saved songs:', response.statusText);
      return [];
    }

    console.log(response);
    const nextStage = await response.json();
    console.log(nextStage);
    let songsAboutToBeReturned = [];
    songsAboutToBeReturned = nextStage.items.map((savedPlaylist) => ({
        id: savedPlaylist.id,
        name: savedPlaylist.name,
    }))
    console.log(songsAboutToBeReturned);
    console.log('Mapped Songs:', JSON.stringify(songsAboutToBeReturned, null, 2));
    return songsAboutToBeReturned;
  }

  async function handleSaveToUserAccount(playlist, playlistName, e /*accessToken*/) {
    //code to save playlist to user account - to be replaced with spotify version later
    //need to save .uri of each track in playlist to a new state.
    // probably need to add playlist name, too
    //e.preventDefault(); //I'm not sure whether i need this, just putting it here to be safe
    console.log(e)
    if (e) {
    e.preventDefault();
    }
    const accessToken = Spotify.getAccessToken();
    console.log(accessToken);
    const response = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    }}); //this is to get the user's ID, for the next step.
    const userIDMaterial = await response.json();
    console.log(userIDMaterial);
    //console.log(userIDMaterial.id);
    const userID = userIDMaterial.id;
    console.log(userID);
    
     //now to make a new playlist
     if (!playlistName) {
      console.log('playlistName does not exist!');
     }
     console.log(playlistName); //need to find why playListName is not being set
     const playlistNameForAPI = playlistName;
     console.log(playlistNameForAPI);
     const response1 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': playlistNameForAPI,
        'description': 'N/A',
        'public': true //the permissions of the scope granted by the access token only allow it to be public, or it won't work
      })});
      const getPlaylistID = await response1.json();
      console.log(getPlaylistID);
      const playListId = getPlaylistID.id;
      console.log(playListId);

     //okay, now to do the final part
     const tracksToAdd = playlist.map((track) => {
      return track.uri
     });
     console.log('These are your tracks to add: ' + tracksToAdd);
     const response2 = await fetch(`https://api.spotify.com/v1/playlists/${playListId}/tracks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({    //need to display the song uri for each song in the playlist state
        "uris": 
        tracksToAdd
        ,
        "position": 0
      }
      )})
      const responseJson = await response2.json();
      console.log(responseJson); //to make sure its the snapshot_id string that needs returning 
      //then update a responseState, so i can only update display fo svaed tracks, when save to spotify button has been clicked
      setResponseState(responseJson);
     };
  


    /*const tracksToSaveURI = playlist.uri;
    setUserAccountPlaylist((prev) => [...prev,  
      { tracks: tracksToSaveURI,
        name: playlistName
      }
      ]);
    console.log("tracks saved as playlist to user account: " + {userAccountPlaylist});

    //then need to reset playlist - just 'setPlayList([])'?
    setPlaylist([]);*/

  

  function handleTrackRemoval(e) {
    //something like
    console.log('tracktoremove event handler clicked');
    //const trackToRemoveId = parseInt(e.target.value, 10);
    const trackToRemoveId = e.target.value; //okay, i fixed this, don't need parseInt function as the ai assistant previously suggested
    setPlaylist((prevPlaylist) => 
      prevPlaylist.filter((track) => track.id !== trackToRemoveId)
      );
    console.log(playlist);
  }



  async function handleSongSearchAPI(e, songSearch) {
  //my idea is that this called when search button clicked, and its uses existing 
  //songSearch value to create the http URL for GET request. Results will be saved to a
  //variable that is then displayed in the SearchBarResults component
    e.preventDefault();
    const songToSearch = songSearch;
    console.log('Function being called');
    Spotify.search(songToSearch).then(setSearchResultsData);
    console.log(searchResultsData);
  };


  return (
    <div className="App">
      <header className="App-header">
        <div className="SearchBar">
          <SearchBar /*add style class here?*/ 
          playlistName={playlistName} 
          songSearch={songSearch} 
          handleSongSearch={handleSongSearch} 
          handleSongSearchAPI={handleSongSearchAPI}
          searchResultsData={searchResultsData}/>
        </div>
        <div>
          <SavedTracks 
          getSavedSongs={getSavedSongs}
          responseState={responseState}
          />
        </div>
        <div className="main">
          <div className="SearchResults">
            <SearchResults searchResultsData={searchResultsData} handleAddSong={handleAddSong}/>
          </div>
          <div className="Playlist">
            <Playlist 
            handleSaveToUserAccount={handleSaveToUserAccount} 
            playlist={playlist}  
            playlistName={playlistName} 
            handlePlaylistName={handlePlaylistName} 
            handleTrackRemoval={handleTrackRemoval}/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
 