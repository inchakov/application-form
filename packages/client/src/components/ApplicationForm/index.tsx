import Form from 'react-bootstrap/esm/Form';
import { useForm } from 'react-hook-form';
import { Application, PartialApplication } from '../../shared/model/application';
import Button from 'react-bootstrap/Button';
import ApplicationPerson from './ApplicationPerson';
import ApplicationAddress from './ApplicationAddress';
import ApplicationVehicles from './ApplicationVehicles';
import './ApplicationForm.css';
import ApplicationDrivers from './ApplicationDrivers';
import { useApplicationCalculatorApi } from '../../hooks/use-application-calculator-api';
import { useCallback, useEffect } from 'react';
import { useApplicationDataApi } from '../../hooks/use-application-data-api';
import { ApplicationUid } from '../../shared/model/application-uid';


export default function ApplicationForm(props: ApplicationUid) {

    const { applicationUid } = props;

    const form = useForm<PartialApplication>({
        defaultValues: {
            vehicles: [{}]
        }
    })
    const { handleSubmit, reset } = form;

    const { getApplication } = useApplicationDataApi()
    const { calculatePrice } = useApplicationCalculatorApi()

    useEffect(() => {
        getApplication(applicationUid)
            .then(application => {
                reset(application)
            })
            .catch(e => console.error(e))
    }, [getApplication, reset, applicationUid])

    const onSubmit = useCallback(async (data: PartialApplication) => {
        try {
            const results = await calculatePrice(data as Application)
            console.log(results)
        } catch (error) {
            console.error(error)
        }
    }, [calculatePrice])

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