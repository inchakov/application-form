import React from "react";
import Form from "react-bootstrap/esm/Form";
import { UseFormReturn } from "react-hook-form";
import { States } from "../data/us-states";
import { PartialApplication } from "../shared/model/application";

export default function ApplicationAddress(
    props: UseFormReturn<PartialApplication>
) {
    const { register, formState: { errors } } = props;

    return (
        <React.Fragment>
            <h2>Address</h2>
            <Form.Group className='application-input-group' controlId='street'>
                <Form.Label>Street</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='123 Main St Apt 456'
                    isInvalid={!!errors.street}
                    {...register('street', { required: 'Address is required' })}
                />
                <Form.Control.Feedback type='invalid'>{errors.street?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='application-input-group' controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Silver Spring'
                    isInvalid={!!errors.city}
                    {...register('city', { required: 'City is required' })}
                />
                <Form.Control.Feedback type='invalid'>{errors.city?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='application-input-group' controlId='city'>
                <Form.Label>State</Form.Label>
                <Form.Select
                    isInvalid={!!errors.state}
                    {...register('state', { required: 'State is required' })}
                >
                    <option value=''>Select...</option>
                    {States.map((state) => (<option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.state?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='application-input-group' controlId='zip'>
                <Form.Label>Zip</Form.Label>
                <Form.Control
                    type='number'
                    placeholder='12345'
                    isInvalid={!!errors.zip}
                    {...register('zip', { required: 'Zip is required', minLength: { value: 5, message: 'Zip must be 5 digits' } })}
                />
                <Form.Control.Feedback type='invalid'>{errors.zip?.message}</Form.Control.Feedback>
            </Form.Group>
        </React.Fragment>
    )
}