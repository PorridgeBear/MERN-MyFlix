import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieGridCell from './MovieGridCell'
import MovieDetails from './MovieDetails'
import { getMovies } from '../api/MoviesService';


function Movies() {

  const [movies, setMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();

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

  const selectMovie = (id) => {
    let movie = movies.find(movie => movie.id == id);
    setSelectedMovie(movie);
  }

  const deselectMovie = () => {
    setSelectedMovie(null);
  }

  return (
    <div className='row'>
      {/* <div className='col-12'>
        {!isFetching && <p>There are {movies.length} movies.</p>}
      </div> */}
      {movies.map(movie => (
        <MovieGridCell
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster={movie.poster}
          selectMovie={selectMovie}
        />
      ))}
      <MovieDetails movie={selectedMovie} deselectMovie={deselectMovie} />
    </div>
  );
}

export default Movies;
