import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieGridCell from './MovieGridCell'
import { getMovies } from '../api/MoviesService';


function Movies() {

  const [movies, setMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchMovies();    
  }, []);

  const fetchMovies = () => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    getMovies()
      .then(movies => {
        setMovies(movies['movies']);
        setIsFetching(false);
      });
  };

  return (
    <div className='row'>
      {/* <div className='col-12'>
        {!isFetching && <p>There are {movies.length} movies.</p>}
      </div> */}
      {movies.map((movie) => (
        <MovieGridCell key={movie.id} title={movie.title} tags={movie.tags} poster={movie.poster} />
      ))}
    </div>
  );
}

export default Movies;
