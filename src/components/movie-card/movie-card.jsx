import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card className="card-style" style={{ width: '18rem' }}>
        <Card.Img variant="top" className="image-style" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="title-style">{movie.Title}</Card.Title>
          <Card.Text className="text-style">{movie.Description}</Card.Text>
          <Button className="button-style" onClick={() => onMovieClick(movie)} variant="warning">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};