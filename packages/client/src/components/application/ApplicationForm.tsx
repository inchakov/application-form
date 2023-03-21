import Form from 'react-bootstrap/esm/Form';
import { useForm } from 'react-hook-form';
import { PartialApplication } from '../../shared/model/application';
import Button from 'react-bootstrap/Button';
import ApplicationPerson from './ApplicationPerson';
import ApplicationAddress from './ApplicationAddress';
import ApplicationVehicles from './ApplicationVehicles';
import './ApplicationForm.css';
import ApplicationDrivers from './ApplicationDrivers';


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

    const date = new Date()
    const maxDateOfBirth = new Date(date.getFullYear() - 16, date.getMonth(), date.getDate())

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <ApplicationPerson maxDateOfBirth={maxDateOfBirth} {...form}/>
            <ApplicationAddress {...form} />
            <ApplicationDrivers maxDateOfBirth={maxDateOfBirth} {...form} />
            <ApplicationVehicles {...form} />
            <Button className='request-price-button' as='input' type='submit' value='Request Price' />
        </Form>
    );
} 