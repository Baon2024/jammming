import React, { useState } from 'react';


//import playlist from the playlist react state in app parent component
//in order to use it to show all songs added to playlist array

function Playlist({playlist, handleTrackRemoval, playlistName, handlePlaylistName, handleSaveToUserAccount}) {


    return (
        <>
          <div>
            <input type="text" value={playlistName} name="playlist-name" onChange={handlePlaylistName}/>
          </div>
          <div>
            {playlist.map((track) => (
              <div key={track.id}>
                <h2>{track.name}</h2>
                <p>{track.artist}</p>
                <p>{track.album}</p>
                <button onClick={handleTrackRemoval} value={track.id}>-</button>
            </  div>
            ))}
          </div>
          <div>
            <button value={playlist} onClick={(e) => handleSaveToUserAccount(playlist, playlistName, e)} playlistName={playlistName}>Save to Spotify</button>
          </div>
        </>
    )
}
//so, need to have all the items (songs) of playlist array saved when button is clicked
//and a event handler occurs. presumably pushing all members of playlist state into a new array?
// 'delete' button requires that each song have an ID, so clicking on it returns every playlist item in array without that id


export default Playlist;