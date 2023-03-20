import React from 'react';
import Form from 'react-bootstrap/esm/Form';
import { useForm } from 'react-hook-form';
import { PartialApplication } from '../shared/model/application';
import Button from 'react-bootstrap/Button';
import './ApplicationForm.css';
import ApplicationPerson from './ApplicationPerson';
import ApplicationAddress from './ApplicationAddress';
import ApplicationVehicles from './ApplicationVehicles';


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

            <Button as='input' type='submit' value='Request Price' />
        </Form>
    );
} 