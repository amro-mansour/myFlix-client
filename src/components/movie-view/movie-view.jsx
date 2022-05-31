import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
// /users/:Username/movies/:MovieID

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavouriteMovies: [],
    };
  }

  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://amro-mansour-movie-api.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //assign the result to the state
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          FavouriteMovies: response.data.FavouriteMovies,
        });
      })
      .catch((e) => console.log(e));
  }
  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  // Add Favourite movie 
  addFavMovie = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    let userFavMovies = this.state.FavouriteMovies;
    let isFav = userFavMovies.includes(this.props.movie._id);
    if (!isFav) {
      axios.post(`https://amro-mansour-movie-api.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
          console.log(response.data);
          alert(
            `${this.props.movie.Title} has been added to your list of movies`
          );
          window.open(`/movies/${this.props.movie._id}`, "_self");
        })
        .catch(e => {
          console.log('Error')
        });
    } else if (isFav) {
      alert(
        `${this.props.movie.Title} is already present in your list of movies`
      );
    }
  }

  // Delete a movie from Favourite movies 
  removeFavMovie = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    axios.delete(`https://amro-mansour-movie-api.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        console.log(response.data);
        alert(
          `${this.props.movie.Title} has been removed from your list of movies`
        );
        window.open(`/movies/${this.props.movie._id}`, "_self");
      })
      .catch(e => {
        console.log('Error')
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    const { FavouriteMovies, username, password, email, birthday } = this.state;
    let userFavMovies = this.state.FavouriteMovies;
    let isFav = userFavMovies.includes(this.props.movie._id);

    return (

      <Container>
        <Row>
          <Col>
            <Card className="movie-view__card" style={{ width: '40rem' }}>
              <Card.Body>
                <Card.Img className="movie-view__image" variant="top" src={movie.ImagePath} />
                <Card.Title className="title-style">{movie.Title}</Card.Title>

                <Card.Text className="text-style">Genre: {movie.Genre.Name}
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">more info</Button>
                  </Link>
                </Card.Text>

                <Card.Text className="text-style">Director: {movie.Director.Name}
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">more info</Button>
                  </Link>
                </Card.Text>

                <Card.Text className="text-style">{movie.Description}</Card.Text>
                <Button variant="outline-warning" onClick={() => { onBackClick() }}>Back</Button>

                {!isFav && (
                  <Button className="add-list__button" variant="warning" onClick={this.addFavMovie}>Add to your list</Button>
                )}
                {isFav && (
                  <Button className="add-list__button" variant="warning" onClick={this.removeFavMovie}>Remove from your list</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};