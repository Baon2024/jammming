import React, { useState, useEffect } from 'react';
import style from './SearchBar.module.css';
import SearchResults from '../SearchResults/SearchResults';


function SearchBar({songSearch, handleSongSearch, playlistName, handleSongSearchAPI, SearchResultsData}) {

    useEffect(() => {

    console.log("Current value is: " + songSearch);
  }, [songSearch]);

    return (
      <>
        <div>
          <form>
            <section>
              <label for="search">Enter and search your songs below</label>
            </section>
            <section>
                <p>here's the data: {SearchResultsData}</p>
            </section>
            <section>
              <input type="text" name="search" value={songSearch} onChange={handleSongSearch}/>
            </section>
            <section>
              <button type="submit" value={songSearch} onClick={handleSongSearchAPI}>Search</button>
            </section>
            <section>
                <p className={style.p}>Here's the current Song to Search value: {songSearch}</p>
                <p>And here is your current playlist name: {playlistName}</p>
            </section>
          </form>
        </div>
      </>
    )
}

export default SearchBar;