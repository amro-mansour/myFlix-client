import React, { useEffect, useState } from 'react';
import './profile-view.scss'
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';


export function ProfileView({ movies }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [showModal, setShowModal] = useState(false)

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
        setFavouriteMovies(response.data.FavouriteMovies)
        console.log(response.data)
      })
      .catch(e => {
        console.log('Error')
      });
  }

  // Update users info 
  const updateUser = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    axios.put(`https://amro-mansour-movie-api.herokuapp.com/users/${user}`, {
      Username: username,
      Email: email, //Email is a variable which holds the email
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

  // Delete user 
  const deleteUser = () => {
    setShowModal(false)
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    axios.delete(`https://amro-mansour-movie-api.herokuapp.com/users/${user}`,
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then((response) => {
        console.log(response.data);
        alert('Your profile has been deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open("/", "_self");
      })
      .catch(e => {
        console.log('Error')
      });
  }

  const renderFavorites = () => {
    // const { movies } = this.props
    console.log(movies)
    if (movies.length + 0) {

      return (
        <div>
          {favouriteMovies.map((movieId, i) => (
            <MovieCard key={`${i}-${movieId}`} movie={movies.find(m => m._id == movieId)} />
          ))}
        </div>
      )
    }
  }


  return (
    <>
      <Container>
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

          <Button variant="warning" onClick={updateUser}>
            Update you profile
          </Button>
          <Button className='deleteButton' variant="link" onClick={() => setShowModal(true)}>
            Delete your profile
          </Button>
        </Form>

        {showModal &&

          <Modal.Dialog style={{ background: "white" }}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want to delete your profile?</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
              <Button variant="primary" onClick={deleteUser} >Delete it</Button>
            </Modal.Footer>
          </Modal.Dialog>
        }

        <div>
          {renderFavorites()}
        </div>
      </Container>


    </>

  )
}