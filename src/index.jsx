import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import { createRoot } from "react-dom/client";

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {

  render() {
    return (
      <Container>
        <MainView />
      </Container>
    )
  }
}

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(<MyFlixApplication />);