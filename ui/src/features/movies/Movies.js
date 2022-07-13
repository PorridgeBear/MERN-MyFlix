import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetails from '../movieDetails/MovieDetails'
import { load, selectMovies } from './moviesSlice';
import { getMovies } from '../../api/MoviesService';


function Movie({ selectMovie, id, title, poster }) {
  return <div className='col-6 pb-4 col-md-3 col-lg-2' onClick={() => selectMovie(id)}>
    <img alt={title} src={poster} className='w-100' />
  </div>
}

function Movies() {

  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();

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
        dispatch(load(movies));
        setIsFetching(false);
      });
  };

  const selectMovie = (id) => {
    let movie = movies.find(movie => movie.id === id);
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
        <Movie
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
