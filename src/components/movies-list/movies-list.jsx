import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <>
    <Container>
      <Row>
        <Col md={3} sm={3} xs={3} style={{ margin: '1em' }}>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Row>
      <Row>
        {filteredMovies.map(m => (
          <Col md={6} lg={4} key={m._id}>
            <MovieCard movie={m} />
          </Col>
        ))}

      </Row>
    </Container>
  </>;
}

export default connect(mapStateToProps)(MoviesList);