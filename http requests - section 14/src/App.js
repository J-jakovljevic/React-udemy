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
      const response = await fetch('https://react-http-17999-default-rtdb.europe-west1.firebasedatabase.app/movies.json');

      if(!response.ok) {                            
        throw new Error('Something went wrong!');  
      }

      const data = await response.json();  

      const loadedMovies = [];
      
      for(const key in data) {          // key is seen in console like random string
        loadedMovies.push({
          id: key,                    // data we're working with in front : data we get back from json
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate
        })
      }

        setMovies(loadedMovies);  
        setIsLoading(false);
    } catch (error) {
      setError(error.message);        // message from line 18
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {             // with useEffect we're setting page to load data when user loads page, not when click on button 
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);   // with no dependecies [] this method will run only first time when page is loaded (with some bugs)
                              // but we learned to list all dependecies which we have in function, but if we set [fetchMoviesHandler], 
                              // we'll get into infinite loop -> so we'll use callBack()

  async function addMovieHandler(movie) {       // async is a second way to manage promises, a first one is .then()
    const response = await fetch('https://react-http-17999-default-rtdb.europe-west1.firebasedatabase.app/movies.json', {    // fetch is used to fetch data and also to send data
      method: 'POST',
      body: JSON.stringify(movie),          // sending a post request will create a resource (body) and body needs json data (stringify is used to transform js object to json)
      headers: {
        'Content-Type': 'application/json'
      }
    });  
    const data = await response.json();   // firebase sends back data in json format
    console.log(data);
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
