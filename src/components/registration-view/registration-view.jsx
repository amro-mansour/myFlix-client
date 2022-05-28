import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://amro-mansour-movie-api.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };

  return (
    <Container className='container-style'>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Create an account for free</Card.Title>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder='Enter a username'
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      minLength='8'
                      placeholder='Your password must be 8 or more characters'
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder='Enter a valid Email address'
                      required
                    />
                  </Form.Group>

                  <Button variant='warning'
                    type='submit'
                    onClick={handleRegister}>
                    Sign Up
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}