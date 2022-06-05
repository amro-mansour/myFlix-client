import React from 'react';
import './director-view.scss';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';


export class DirectorView extends React.Component {


  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card text='dark' className="directorCard">
        <Card.Header className="directorTitle">{director.Name}</Card.Header>
        <Card.Body>
          <Card.Text> Born: {director.Birth}</Card.Text>
          <Card.Text> Biography: {director.Bio}</Card.Text>
          <Button variant="warning" onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
      </Card>
    )
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    // death: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}