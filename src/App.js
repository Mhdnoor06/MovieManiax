import React, { useState, useEffect } from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

const API_URL =
  'https://api.themoviedb.org/3/movie/popular?api_key=b8a613424250b60e8cbbd825ed1dbede';

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log('Searching');
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=b8a613424250b60e8cbbd825ed1dbede&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Navbar bg="black" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/home">
            <h3 className="text-warning">Movie Maniax</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: '100px' }}
            >
              {/* Add navigation links here if needed */}
            </Nav>
            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              />
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container mt-4">
        <div className="row">
          {movies.length > 0 ? (
            movies.map((movieReq) => (
              <div key={movieReq.id} className="col-sm-6 col-md-4 col-lg-3">
                <MovieBox {...movieReq} />
              </div>
            ))
          ) : (
            <h2 className="col-12 text-center">Sorry!! No Movies Found</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
