import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);     // initially we have no error
 
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);                           // clearing previous errors
    try {
      const response = await fetch('https://react-http-17999.firebaseio.com/movies.json');

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
      setError(error.message);        // message from line 18
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {             // with useEffect we're setting page to load data when user loads page, not when click on button 
    fetchMoviesHandler();
  }, []);                      // with no dependecies [] this method will run only first time when page is loaded (with some bugs)
                              // but we learned to list all dependecies which we have in function, but if we set [fetchMoviesHandler], 
                              // we'll get into infinite loop -> so we'll use callBack()

  function addMovieHandler(movie) {
    console.log(movie);
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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
