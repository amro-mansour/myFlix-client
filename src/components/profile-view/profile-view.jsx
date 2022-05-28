import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { NavbarView } from '../navbar-view/navbar-view';

export function ProfileView({ movies }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favouriteMovies, setFavouriteMovies] = useState('');
  useEffect(() => {
    getUser()

  }, [])

  const getUser = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    axios.get(`https://amro-mansour-movie-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        setUsername(response.data.Username)
        //password: response.data.Password,
        setEmail(response.data.Email)
        //birthday: response.data.Birthday,
        //favouriteMovies: response.data.FavouriteMovies,
        console.log(response.data)
      })
      .catch(e => {
        console.log('Error')
      });
  }

  const handleClick = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    axios.put(`https://amro-mansour-movie-api.herokuapp.com/users/${user}`, {
      Username: username,
      Email: email, //varEmail is a variable which holds the email
      Password: password
    },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then((response) => {
        //setUsername(response.data.Username)
        //password: response.data.Password,
        //setEmail(response.data.Email)
        //birthday: response.data.Birthday,
        //favouriteMovies: response.data.FavouriteMovies,
        localStorage.setItem('user', response.data.Username),
          console.log(response.data)
      })
      .catch(e => {
        console.log('Error')
      });
  }

  {/* 
  const favouriteMovies = movies.filter((movies) => {

  })
  */}
  console.log(username)
  return (

    <div>
      <h1>Profile Page</h1>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="username" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter new email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="Password" />
        </Form.Group>


        <Button variant="primary" onClick={handleClick}>
          Submit
        </Button>
      </Form>
    </div>

  )
}