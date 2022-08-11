import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films').then((response) => {   // method for fetch api (default method is get) which returns
                                                              // promise bcs sending htpp req.is asynchronous which means 
                                                              // it doesn't finish immediately -> response will be there
                                                              // in the future -> we need promise
                                                              // .then will be called whenever we got response
      return response.json();      // transforms json response body to js object and returns a promise
    }).then((data) => {             // here we got our transformed data 
      const transformedMovies = data.results.map(movieData => {  // .map() - converting every object in the results array into a new object
        return {
          id: movieData.episode_id,               // data we're working with in front : data we get back from json
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      })
      setMovies(transformedMovies);
    });     
  }  
  
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
