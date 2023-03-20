import React from 'react';
import Form from 'react-bootstrap/esm/Form';
import { useForm } from 'react-hook-form';
import { PartialApplication } from '../shared/model/application';
import Button from 'react-bootstrap/Button';
import ApplicationPerson from './ApplicationPerson';
import ApplicationAddress from './ApplicationAddress';
import ApplicationVehicles from './ApplicationVehicles';
import './ApplicationForm.css';


export default function ApplicationForm() {

    const form = useForm<PartialApplication>({
        defaultValues: {
            vehicles: [{}]
        }
    })

    const { handleSubmit } = form;

    const onSubmit = (data: PartialApplication) => {
        console.log(data);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <ApplicationPerson {...form}/>
            <ApplicationAddress {...form}/>
            <ApplicationVehicles {...form} />
            <Button className='request-price-button' as='input' type='submit' value='Request Price' />
        </Form>
    );
} 