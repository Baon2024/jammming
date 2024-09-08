import React, { useState } from 'react';
import style from './SearchResults.module.css';




function SearchResults({searchResultsData, handleAddSong}) {

//tracklist send down from API function in parent component will replace mockData in the returned JSX below.

  const mockData = [
    { 
        name: "Heart of the Dog",
        artist: "Motorhead",
        album: "Gravedigger",
        id: 1,
        uri: "Spotify:Album:2h2h23j29292j"
    }, 
    {
        name: "Heartbreaker",
        artist: "Led Zepplin",
        album: "Led Zepplin III",
        id: 2,
        uri: "Spotify:Album:23hg3h3j3j"
    }
  ];

  if (!searchResultsData) {
    return <div>No results</div>;
  }

    return (
      <>
        <div>
            <h2>Results</h2>
            <div className={style.collection}>
            {searchResultsData.map((track) => (
                <div key={track.id} className={style.second}>
                  <div>
                    <p className={style.name}>{track.name}</p>
                    <p className={style.minor}>{track.artist}</p>
                    <p className={style.minor}>{track.album}</p>
                  </div>
                  <div>
                    <button className={style.plus} value={JSON.stringify(track)} onClick={handleAddSong}>+</button>
                  </div>
                </div>
            ))}
        </div>
      </div>
      </>

    )
}

export default SearchResults;