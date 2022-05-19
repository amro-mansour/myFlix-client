import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (

      <Container>
        <Row>
          <Col>
            <Card className="movie-view__card" style={{ width: '40rem' }}>
              <Card.Body>
                <Card.Img className="movie-view__image" variant="top" src={movie.ImagePath} />
                <Card.Title className="title-style">{movie.Title}</Card.Title>
                <Card.Text className="text-style">Genre: {movie.Genre.Name}</Card.Text>
                <Card.Text className="text-style">Director: {movie.Director.Name}</Card.Text>
                <Card.Text className="text-style">{movie.Description}</Card.Text>
                <Button variant="outline-warning" onClick={() => { onBackClick(null) }}>Back</Button>
                <Button className="add-list__button" variant="warning">Add to your list</Button>
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