import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/esm/Form';
import { useForm } from 'react-hook-form';
import { PartialApplication } from '../../../shared/model/application';
import Button from 'react-bootstrap/Button';

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm<PartialApplication>({})
  const onSubmit = (data: PartialApplication) => console.log(data);

  return (
    <Container className='application-container'>
      <h1>Insurance Application</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='application-input-group' controlId='firstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='John'
            {...register('firstName', { required: true })}
            isValid={!errors.firstName}
          />
        </Form.Group>
        <Form.Group className='application-input-group' controlId='lastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Doe'
            {...register('lastName', { required: true })}
            isValid={!errors.lastName}
          />
          <Form.Control.Feedback type='invalid'>{errors.lastName ? 'Please input Last Name' : ''}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='application-input-group' controlId='dateOfBirth'>
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type='Date' max='2007-03-19' {...register('dateOfBirth')} />
          <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
        </Form.Group>
        <Button as='input' type='submit' value='Request Price' />
      </Form>
    </Container>
  );
}

export default App;
