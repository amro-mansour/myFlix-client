import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


export class DirectorView extends React.Component {


  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card>
        <Card.Header>{director.Name}</Card.Header>
        <Card.Body>
          <Card.Text> Born: {director.Birth}</Card.Text>
          <Card.Text> Biography: {director.Bio}</Card.Text>
          <Button variant="warning" onClick={() => { onBackClick() }}>Back</Button>
        </Card.Body>
      </Card>
    )
  }
}