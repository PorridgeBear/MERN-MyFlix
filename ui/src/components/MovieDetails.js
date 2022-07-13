import React from 'react';
import { Container, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

function MovieDetails({ deselectMovie, movie }) {
  if (!movie) {
    return null;
  }

  return (
    <Modal show={true}>
      <Modal.Header closeButton onHide={deselectMovie}>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='movie-details-body'>
        <div className='movie-details-poster'><img alt={movie.title} src={movie.poster} /></div>
        <div className='row'>
          <div className='col-6'>
            <p>Released: {movie.released}, Rating: {movie.rating}</p>
            <p>{movie.synopsis}</p>
          </div>
          <div className='col-6'>
            <dl>
              <dt>Director(s)</dt>
              <dd>
                <ul>
                  {movie.directors.map(director => (
                    <li>{director}</li>
                  ))}
                </ul>
              </dd>
              <dt>Genres</dt>
              <dd>
                <ul>
                  {movie.genres.map(genre => (
                    <li>{genre}</li>
                  ))}
                </ul>
              </dd>
              <dt>Cast</dt>
              <dd>
                <ul>
                  {movie.cast.map(castMember => (
                    <li>{castMember}</li>
                  ))}
                </ul>
              </dd>
            </dl>
          </div>
        </div>

      </Modal.Body>
    </Modal>
  )
}

export default MovieDetails;
