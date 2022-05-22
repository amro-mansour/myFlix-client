import React from 'react';
import axios from 'axios';
<<<<<<< Updated upstream

=======
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Row, Col, Container, Navbar, Nav } from 'react-bootstrap';
import { NavbarView } from '../navbar-view/navbar-view';
>>>>>>> Stashed changes
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
<<<<<<< Updated upstream
=======
import { render } from 'react-dom/cjs/react-dom.production.min';


>>>>>>> Stashed changes

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://amro-mansour-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }


  render() {
    const { movies, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
<<<<<<< Updated upstream
      <div className="main-view">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
          ))
        }
      </div>
=======
      <Router>
        <Row className="main-view justify-content-md-center">
          <Routes>
            <Route exact path="/" render={() => {
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
          </Routes>
          <Routes>
            <Route path="/movies/:movieId" render={({ match }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
              </Col>
            }} />
          </Routes>

        </Row>
      </Router>
>>>>>>> Stashed changes
    );
  }
}

export default MainView;

{/*
<Container>
<Row>
<NavbarView />
</Row>
<button onClick={() => { this.onLoggedOut() }}>Logout</button>
<Container />
*/}


