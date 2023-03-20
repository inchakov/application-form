import Form from 'react-bootstrap/esm/Form';
import { useForm } from 'react-hook-form';
import { PartialApplication } from '../shared/model/application';
import Button from 'react-bootstrap/Button';
import './ApplicationForm.css';


export default function ApplicationForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<PartialApplication>({})

    const onSubmit = (data: PartialApplication) => console.log(data);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>

            <h2>Personal Information</h2>

            <Form.Group className='application-input-group' controlId='firstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='John'
                    {...register('firstName', { required: 'First name is required' })}
                    isInvalid={!!errors.firstName?.message}
                />
                <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='application-input-group' controlId='lastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Doe'
                    {...register('lastName', { required: 'Last name is required' })}
                    isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type='invalid'>{errors.lastName?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='application-input-group' controlId='dateOfBirth'>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                    type='Date'
                    max='2007-03-19'
                    isInvalid={!!errors.dateOfBirth}
                    {...register('dateOfBirth', { required: 'Date of birth is required' })}
                />
                <Form.Control.Feedback type='invalid'>{errors.dateOfBirth?.message}</Form.Control.Feedback>
            </Form.Group>

            
            <h2>Address</h2>

            <Button as='input' type='submit' value='Request Price' />
        </Form>
    );
} 