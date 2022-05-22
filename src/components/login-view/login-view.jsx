import React, { useState } from 'react';
<<<<<<< Updated upstream
=======
import { Form, FormGroup, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import './login-view.scss';
>>>>>>> Stashed changes

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    axios.post('https://amro-mansour-movie-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <form>
      <label>Username:
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
      </label>

      <label>Password:
        <input type='password' value={password} onchange={e => setPassword(e.target.value)} />
      </label>

      <button type='submit' onClick={handleSubmit}>Submit</button>
      <button type='button'>Sign Up</button>
    </form>
  );
}