import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/esm/Form';

function App() {
  return (
    <Container className="application-container">
      <h1>Application</h1>
      <Form>
        <Form.Group className="application-input-group" controlId='firstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control type='text' placeholder='John' />
          <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="application-input-group" controlId='lastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='text' placeholder='Doe' />
          <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="application-input-group" controlId='dateOfBirth'>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type='Date' max='2007-03-19'/>
          <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default App;
