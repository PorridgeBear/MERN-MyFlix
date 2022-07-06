import React, { useState, useEffect } from 'react';
import { Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo@3x.png'
import { getMovies } from './services/MoviesService';

function Movie ({ title, tags, poster }) {
  return <div className='col-6 pb-4 col-md-3 col-lg-2'>
      <img alt={title} src={poster} className='w-100' />
    </div>
}

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
        <Movie key={movie.id} title={movie.title} tags={movie.tags} poster={movie.poster} />
      ))}
    </div>
  );
}

function App() {
  return (
    <Container className='mt-4'>
      <div className="row mb-4">
        <div className='col'>
          <img alt='MyFlix' src={logo} width='100' />
        </div>
      </div>
      <Movies />
    </Container>
  );
}

export default App;
