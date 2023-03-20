import React from "react";
import Form from "react-bootstrap/esm/Form";
import { UseFormReturn } from "react-hook-form";
import { PartialApplication } from "../../shared/model/application";

export default function ApplicationPerson(
    props: UseFormReturn<PartialApplication>
) {
    const { register, formState: { errors } } = props;

    const date = new Date()
    const maxDateOfBirth = new Date(date.getFullYear() - 16, date.getMonth(), date.getDate())

    return (
        <React.Fragment>
            <h2 className="application-section">Personal Information</h2>

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
                    max={maxDateOfBirth.toISOString().split('T')[0]}
                    isInvalid={!!errors.dateOfBirth}
                    {...register('dateOfBirth', { required: 'Date of birth is required' })}
                />
                <Form.Control.Feedback type='invalid'>{errors.dateOfBirth?.message}</Form.Control.Feedback>
            </Form.Group>
        </React.Fragment>
    )
}