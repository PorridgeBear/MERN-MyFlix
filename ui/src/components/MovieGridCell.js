import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Movie ({ selectMovie, id, title, poster }) {
  return <div className='col-6 pb-4 col-md-3 col-lg-2' onClick={() => selectMovie(id)}>
      <img alt={title} src={poster} className='w-100' />
    </div>
}

export default Movie;
