import React from 'react';
import { Container, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import logo from './logo@3x.png'
import Movies from './features/movies/Movies'

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
