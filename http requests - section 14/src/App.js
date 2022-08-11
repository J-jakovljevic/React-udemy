import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);     // initially we have no error

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);                           // clearing previous errors
    try {
      const response = await fetch('https://swapi.dev/api/films');

      if(!response.ok) {                            // .ok gives signal if response was success
        throw new Error('Something went wrong!');   // goes to catch block if has error
      }

      const data = await response.json();  
  
      const transformedMovies = data.results.map(movieData => {  // .map() - converting every object in the results array into a new object
          return {
            id: movieData.episode_id,                         // data we're working with in front : data we get back from json
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          }
        });
        setMovies(transformedMovies);  
        setIsLoading(false);
    } catch (error) {
      setError(error.message);        // message from line 19
    }
    setIsLoading(false);
  }  

  let content = <p>Found no movies.</p>;

  if(movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if(error) {
    content = <p>{error}</p>
  }

  if(isLoading) {
    content = <p>Loading...</p>
  }
  
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
