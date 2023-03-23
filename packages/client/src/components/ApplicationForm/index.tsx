import Form from 'react-bootstrap/esm/Form';
import { useForm } from 'react-hook-form';
import { Application, MinDriverAge, PartialApplication } from '../../shared/model/application';
import Button from 'react-bootstrap/Button';
import ApplicationPerson from './ApplicationPerson';
import ApplicationAddress from './ApplicationAddress';
import ApplicationVehicles from './ApplicationVehicles';
import ApplicationDrivers from './ApplicationDrivers';
import { useCallback } from 'react';
import { ApplicationPrice } from '../../shared/model/application-price';
import './ApplicationForm.css';

export interface ApplicationFormProps {
    application: PartialApplication
    requestPrice?: (application: Application) => Promise<ApplicationPrice>
}

export default function ApplicationForm(props: ApplicationFormProps) {
    
    const { application, requestPrice } = props

    const form = useForm<PartialApplication>({
        values: application
    })

    const { handleSubmit } = form;

    const onRequestPrice = useCallback(async (data: PartialApplication) => {
        if (requestPrice) {
            requestPrice(data as Application)
        }
    }, [requestPrice])

    const date = new Date()
    const maxDateOfBirth = new Date(date.getFullYear() - MinDriverAge, date.getMonth(), date.getDate())

    return (
        <Form onSubmit={handleSubmit(onRequestPrice)}>
            <ApplicationPerson maxDateOfBirth={maxDateOfBirth} {...form}/>
            <ApplicationAddress {...form} />
            <ApplicationDrivers maxDateOfBirth={maxDateOfBirth} {...form} />
            <ApplicationVehicles {...form} />
            <Button className='request-price-button' as='input' type='submit' value='Request Price' />
        </Form>
    );
} 