import Form from 'react-bootstrap/esm/Form';
import { useForm } from 'react-hook-form';
import { Application, MinDriverAge, PartialApplication } from '../../shared/model/application';
import Button from 'react-bootstrap/Button';
import ApplicationPerson from './ApplicationPerson';
import ApplicationAddress from './ApplicationAddress';
import ApplicationVehicles from './ApplicationVehicles';
import './ApplicationForm.css';
import ApplicationDrivers from './ApplicationDrivers';
import { useCallback } from 'react';

export interface ApplicationFormProps {
    application: PartialApplication
    onSubmit?: (application: Application) => void
}

export default function ApplicationForm(props: ApplicationFormProps) {
    
    const { application, onSubmit } = props

    const form = useForm<PartialApplication>({
        values: application
    })

    const { handleSubmit } = form;

    const submitForm = useCallback(async (data: PartialApplication) => {
        if(onSubmit) {
            onSubmit(data as Application)
        }
    }, [onSubmit])

    const date = new Date()
    const maxDateOfBirth = new Date(date.getFullYear() - MinDriverAge, date.getMonth(), date.getDate())

    return (
        <Form onSubmit={handleSubmit(submitForm)}>
            <ApplicationPerson maxDateOfBirth={maxDateOfBirth} {...form}/>
            <ApplicationAddress {...form} />
            <ApplicationDrivers maxDateOfBirth={maxDateOfBirth} {...form} />
            <ApplicationVehicles {...form} />
            <Button className='request-price-button' as='input' type='submit' value='Request Price' />
        </Form>
    );
} 